import { Router, Request, Response } from "express";
import { callSpotifyApi, ResponseObj } from "../apiUtilities";
import { SpotifyPlaylist } from "../../types/Spotify/types";
import { off } from "process";


export type Playlist = {
    name: string;
    description: string;
    id: string;
    public: boolean;
    ownerId: string;
    ownerName: string;
    images: {
        url: string;
        width: number;
        height: number;
    }[];
    etag: string;
    length: number;
    type: string;
}

export type PlaylistBundle = {
    playlists: Playlist[],
    total: number
}

export async function handleMyPlaylists(router: Router) {
    router.get('/myPlaylists', async (req: Request, res: Response) => {
        const authToken = req.headers.authorization;
        const built = await getAllPlaylists(authToken);
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
    

//This can be optomized quite a bit
export async function getAllPlaylists(authToken: string): Promise<ResponseObj<PlaylistBundle>> {
    const chunkSize = 50;
    let resp = await getSubsetOfPlayLists(authToken, 0, chunkSize);

    if(resp.status !== 200){ return { status: resp.status, errMessage: resp.errMessage }}
    let total = resp.total
    let playlists: SpotifyPlaylist[] = resp.PlayLists;
    for(let i = 0; i < total; i += chunkSize){
        resp = await getSubsetOfPlayLists(authToken, i, chunkSize);
        if(resp.status !== 200){ return { status: resp.status, errMessage: resp.errMessage }}
        playlists = playlists.concat(resp.PlayLists);
    }

    let convertedPlaylists: Playlist[] = [];
    playlists.forEach((pl) => {
        convertedPlaylists.push(spotifyPlaylistToPlaylist(pl));''
    })

    return {
        status: 200,
        data: {
            playlists: convertedPlaylists,
            total: total
        }
    }
}

async function getSubsetOfPlayLists(authToken, offset, limit){
    const response = await callSpotifyApi({
        url: '/v1/me/playlists',
        urlParams: { limit: limit, offset: offset },
        authToken: authToken
    });
    return {
        status: response.status,
        PlayLists: response.data?.items,
        total: response.data?.total,
        errMessage: response.errMessage
    }
}

function spotifyPlaylistToPlaylist(spl: SpotifyPlaylist): Playlist{
    if(!spl){
        return undefined;
    }
    return {
        name: spl.name,
        description: spl.description,
        id: spl.id,
        public: spl.public,
        ownerId: spl.owner?.id,
        ownerName: spl.owner?.display_name,
        images: spl.images,
        etag: spl.snapshot_id,
        length: spl.tracks?.total,
        type: spl.type
    }
}

