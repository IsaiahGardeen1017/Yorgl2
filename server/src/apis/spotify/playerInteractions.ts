import { Router, Request, Response } from "express";
import { Track } from "../../types/data/Track";
import { SpotifyPlaybackStateResponse } from "../../types/Spotify/types";
import axios from "axios";
import { callSpotifyApi, ResponseObj } from "../apiUtilities";


export async function handleSetPlayState(router: Router) {
    router.put('/playState', async (req: Request, res: Response) => {
        const authToken = req.headers.authorization;
        res.status(200).send('YherkedAndGrerckt');
    });
}

async function getData(authToken: string): Promise<ResponseObj<any>> {
    return undefined;
};

