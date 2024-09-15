import { Router, Request, Response } from "express";
import { callSpotifyApi, ResponseObj } from "../apiUtilities";
import { SpotifyPlaylist } from "../../types/Spotify/types";
import { off } from "process";
import { Playlist } from "./getPlaylist";

function parseSongQueryParam(param): string[] {
    return String(param).split('|');
}
function parseSourceQueryParam(param): string[] {
    return String(param).split('|');
}

export async function handleAddToPlaylist(router: Router) {
    router.get('/addSongs/:playlistId', async (req: Request, res: Response) => {
        const authToken = req.headers.authorization;

        const playlistId = req.params.playlistId;
        const srcPlaylistIds = parseSourceQueryParam(req.query.sources);
        const songIds = parseSongQueryParam(req.query.songs);

        const songsToAdd = await getSongsOfaPlaylist(authToken, srcPlaylistIds);
        const built = {status: 500, data: {}, errMessage: ''};
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



async function getSongsOfaPlaylist(authToken: string, playlistIds: string[]): Promise<string[]> {
    console.log(getSongsOfaPlaylist);
    return [''];
}

async function addSongsToPlaylist(): Promise<ResponseObj> {
    return {
        status: 200
    }
}


