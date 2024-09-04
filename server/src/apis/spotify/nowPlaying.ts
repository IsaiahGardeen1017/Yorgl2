import { Router, Request, Response } from "express";
import { Track } from "../../types/data/Track";
import test from "node:test";
import { getPlayerMe } from "../../interactions/Spotify/dataRetrievers";

export type NowPlayingResponse = {
    deviceName: string;
    volume?: number;
    repeat?: string;
    shuffle?: boolean;
    is_playing: boolean;
    track: Track;
}

export async function handleNowPlaying(router: Router){
    router.get('/nowPlaying', async (req: Request, res: Response) => {

        const authToken = req.headers.authorization;
        console.log(authToken);
        
        const nowPlayingData: NowPlayingResponse = await getPlayerMe(authToken);
        if(nowPlayingData){
            console.log('returing data');
            res.send(JSON.stringify(nowPlayingData));
        }else{
            console.log('returing error');
            res.status(500).send('Didn\'t work, worthless error message');
        }
    });
}



