import { Router, Request, Response } from "express";
import { callSpotifyApi, ResponseObj } from "../apiUtilities";
import { SpotifyPlaylist } from "../../types/Spotify/types";
import { off } from "process";
import { Playlist } from "./getPlaylist";
import { addSongsToPlaylist, getSongsOfaPlaylist } from "./utils/SpotifyDataManager";

function parseSongQueryParam(param): string[] {
    return String(param).split('|');
}
function parseSourceQueryParam(param): string[] {
    return String(param).split('|');
}

export async function handleAddSongs(router: Router) {
    router.put('/addSongs/:playlistId', async (req: Request, res: Response) => {
        const authToken = req.headers.authorization;

        const playlistId = req.params.playlistId;
        const srcPlaylistIds = parseSourceQueryParam(req.query.sources);
        const songIds = parseSongQueryParam(req.query.songs);
        const songsToAdd = [];
        const promises = [];
        for (const id of srcPlaylistIds) {
            const func = async (id) => {
                const songs = await getSongsOfaPlaylist(authToken, id);
                for (const s of songs) {
                    songsToAdd.push(s);
                }
            }
            promises.push(func(id));
        }
        const alreadyThereSongs = await getSongsOfaPlaylist(authToken, playlistId);
        await Promise.allSettled(promises);
        
        //Now we need to remove duplicates
        songsToAdd.sort();
        let realSongsToAdd = [];
        for (let i = 0; i < songsToAdd.length; i++) {
            const targetSong = songsToAdd[i];
            if (targetSong !== songsToAdd[i + 1]) {
                if (!alreadyThereSongs.includes(targetSong)) {
                    realSongsToAdd.push(targetSong);
                }
            }
        }
        console.log(realSongsToAdd.length);

        let addResponse = await addSongsToPlaylist(authToken, playlistId, realSongsToAdd);
        if (addResponse.status === 201) {
            res.status(200).send();
        }else{
            console.log('Sending Error');
            res.status(addResponse.status).send(addResponse.errMessage);
        }
    });
}






