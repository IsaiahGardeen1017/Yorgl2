import { Router, Request, Response } from "express";
import { Track } from "../../types/data/Track";
import { SpotifyPlaybackStateResponse } from "../../types/Spotify/types";
import axios from "axios";
import { callSpotifyApi, ResponseObj } from "../apiUtilities";

export type NowPlayingResponse = {
    deviceName: string;
    volume?: number;
    repeat?: string;
    shuffle?: boolean;
    is_playing: boolean;
    track: Track;
}

export async function handleNowPlaying(router: Router) {
    router.get('/nowPlaying', async (req: Request, res: Response) => {
        const authToken = req.headers.authorization;
        const built = await getNowPlayingData(authToken);
        if (built.status === 200 || built.status === 204) {
            res.send(JSON.stringify(built.data));
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

export async function getNowPlayingData(authToken: string): Promise<ResponseObj<NowPlayingResponse>> {
    const response = await callSpotifyApi({
        url: '/v1/me/player',
        urlParams: { market: 'US' },
        authToken: authToken
    });

    if (response.status !== 200) {
        return response;
    }
    const spotifyPlayback: SpotifyPlaybackStateResponse = response.data;
    const returnData: NowPlayingResponse = {
        deviceName: spotifyPlayback.device?.name,
        is_playing: spotifyPlayback.is_playing,
        shuffle: spotifyPlayback.shuffle_state,
        repeat: spotifyPlayback.repeat_state,
        track: spotifyPlayback.item ? {
            album: spotifyPlayback.item.album ? {
                href: spotifyPlayback.item.album.href,
                id: spotifyPlayback.item.album.id,
                images: spotifyPlayback.item.album.images,
                name: spotifyPlayback.item.album.name,
                releaseDate: spotifyPlayback.item.album.release_date
            } : undefined,
            artists: spotifyPlayback.item.artists,
            id: spotifyPlayback.item.id,
            href: spotifyPlayback.item.href,
            name: spotifyPlayback.item.name
        } : undefined
    }
    return {
        status: response.status,
        data: returnData
    };
};

