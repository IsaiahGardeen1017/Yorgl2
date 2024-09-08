import { Router, Request, Response } from "express";
import { Track } from "../../types/data/Track";
import { SpotifyPlaybackStateResponse } from "../../types/Spotify/types";
import axios from "axios";
import { callSpotifyApi, Method, ResponseObj, UrlParams } from "../apiUtilities";
import { getNowPlayingData } from "./nowPlaying";

type Action = 'repeat_track' |
    'repeat_off' |
    'repeat_context' |
    'shuffle_on' |
    'shuffle_off' |
    'play' |
    'pause' |
    'skip' |
    'previous'

export async function handleSetPlayState(router: Router) {
    router.put('/playState/:action', async (req: Request, res: Response) => {
        const action: Action = req.params.action as Action;
        const authToken = req.headers.authorization;
        const doActionResponse = await doPlayerAction(authToken, action);

        if(doActionResponse.status !== 204){
            console.log('Erroring with: ' + doActionResponse.status + ' :: ' + doActionResponse.errMessage);
            res.status(doActionResponse.status).send(doActionResponse.errMessage);
            return;
        }

        const built = await getNowPlayingData(authToken);
        if (built.status === 200 || built.status === 204) {
            res.status(200).send(JSON.stringify(built.data));
        } else {
            switch (built.status) {
                case 401:
                case 403:
                    res.status(built.status).send(built.errMessage);
                    break;
                default:
                    res.status(500).send('Apologies, the developer is stupid');
            }
        }

    });
}

async function doPlayerAction(authToken: string, action: Action): Promise<ResponseObj<boolean>> {
    const getUrl = (action: Action) => {
        switch (action) {
            case 'repeat_track':
            case 'repeat_off':
            case 'repeat_context':
                return '/v1/me/player/repeat';
            case 'shuffle_on':
            case 'shuffle_off':
                return '/v1/me/player/shuffle';
            case 'skip':
                return '/v1/me/player/next';
            case 'pause':
            case 'play':
            case 'previous':
                return '/v1/me/player/' + action;
            default:
                return false;
        }
    };
    let url = getUrl(action);
    if(!url){
        return {status: 400, errMessage: 'Action ' + action + ' not supported'};
    }
    let params: UrlParams = {};
    let actionParts = action.split('_');
    let method: Method = 'PUT';

    if (actionParts[0] === 'repeat') {
        params.state = actionParts[1];
    } else if (action === 'shuffle_on') {
        params.state = 'true';
    } else if (action === 'shuffle_off') {
        params.state = 'false';
    }else if(action === 'skip' || action === 'previous'){
        method = 'POST'
    }

    let response = await callSpotifyApi({
        url: url,
        authToken: authToken,
        urlParams: params,
        method: method
    });

    if(response.status == 204 || response.status == 200){
        return {
            status: 204,
            data: true
        };
    }else{
        return {
            status: response.status,
            errMessage: response.errMessage
        };
    }
}

