import { off } from "process";
import { SpotifyPlaylist, SpotifyPlaylistTrack, SpotifyTrack, SpotifyTrackBundle, SpotifyTrackBundleItem } from "../../../types/Spotify/types";
import { callSpotifyApi, ResponseObj } from "../../apiUtilities";
import { METHODS } from "http";
import { FullPlaylist } from "../../../types/data/Playlist";
import { Track } from "../../../types/data/Track";


/**
 * 
 * @param authToken 
 * @param playlistId string 
 * @returns Array of song ids in supplied playlist, empty array if error
 */
export async function getSongsOfaPlaylist(authToken: string, playlistId: string): Promise<string[]> {
    let songsIdToReturn = [];

    //Get first batch of songs
    let resp = await callSpotifyApi({
        url: '/v1/playlists/' + playlistId + '/tracks',
        urlParams: {
            limit: '50',
        },
        authToken: authToken,
        method: 'GET'
    });

    if (resp.status !== 200) {
        return [resp.errMessage];
    }

    let firstResult: SpotifyTrackBundle = resp.data as SpotifyTrackBundle;
    let numberOfSongs = firstResult.total;

    //Get the rest
    if (numberOfSongs > 50) {
        //here we get the rest of the songs
        let numRequests = Math.ceil(numberOfSongs / 50);
        let promiseArr = [];
        const funcToDo = async (i) => {
            let response = await callSpotifyApi({
                url: '/v1/playlists/' + playlistId + '/tracks',
                urlParams: {
                    limit: '50',
                    offset: '' + (i * 50)
                },
                authToken: authToken,
                method: 'GET'
            });

            if (response.status === 200 && response.data) {
                let result = response.data as SpotifyTrackBundle;
                pushSpotifyTrackSongIdsToArray(songsIdToReturn, result.items);
            }
        }

        for (let i = 1; i < numRequests; i++) {
            promiseArr.push(funcToDo(i));
        }
        await Promise.allSettled(promiseArr);
    }
    pushSpotifyTrackSongIdsToArray(songsIdToReturn, firstResult.items);
    return songsIdToReturn;
}

/**
 * 
 * @param authToken 
 * @param playlistId string Ex: 3cEYpjA9oz9GiPac4AsH4n
 * @returns Array of song ids in supplied playlist, empty array if error [4iV5W9uYEdYUVa79Axb7Rh, 1301WleyT98MSxVHPZCA6M, ...]
 */
export async function addSongsToPlaylist(authToken: string, playlistId: string, songs: string[]): Promise<ResponseObj> {
    console.log('addeing som eosngs' + songs.length);
    const numChunks = Math.ceil(songs.length / 100);
    const chunkSize = Math.ceil(songs.length / numChunks);
    const chunkArrays: string[][] = [];

    //Create chunkArrays
    for (let i = 0; i < numChunks; i++) {
        chunkArrays.push([]);
    }

    //Fill chunkArrays with song ids
    for (let s = 0; s < songs.length; s++) {
        chunkArrays[s % numChunks].push('spotify:track:' + songs[s]);
    }


    let responses: Promise<ResponseObj>[] = [];

    for (const chunk of chunkArrays) {
        console.log('chunked');
        console.log(chunk);
        console.log('/v1/playlists/' + playlistId + '/tracks');
        let respPromise = callSpotifyApi({
            url: '/v1/playlists/' + playlistId + '/tracks',
            authToken: authToken,
            method: 'POST',
            body: {
                uris: chunk
            }
        });
        responses.push(respPromise);
    }

    for (const r of responses) {
        console.log('each');
        let resp = await r;
        if (resp.status !== 201) {
            console.log('Error: ' + resp.status);
            console.log('Message? ' + resp.errMessage);
            return {
                status: resp.status,
                errMessage: 'One of the playlist POST requests failed: ' + resp.errMessage
            }
        } else {
            console.log('added some songs');
        }
    };

    return {
        status: 201
    }
}

/**
 * @param authToken 
 * @param playlistId string Ex: 3cEYpjA9oz9GiPac4AsH4n
*/
export async function getAllPlaylistData(authToken: string, playlistId: string): Promise<ResponseObj<FullPlaylist>> {
    let resp = await callSpotifyApi({
        url: '/v1/playlists/' + playlistId,
        urlParams: {
            limit: '50',
        },
        authToken: authToken,
        method: 'GET'
    });

    if (resp.status !== 200) {
        return {
            status: resp.status,
            errMessage: resp.errMessage
        }
    }

    
    let plData: SpotifyPlaylist = resp.data as SpotifyPlaylist;
    console.log(plData);
    let Tracks: Track[] = plData.tracks.items.map((item: SpotifyPlaylistTrack):Track => {
        return {
            name: item.track.name,
            album?: {
                href: string;
                id: string;
                images: {
                    url: string;
                    width: number;
                    height: number;
                }[];
                name: string;
                releaseDate: string;
            };
            artists?: Artist[];
            id?: string;
            href?: string;
        }
    });
    
    let retplaylist: FullPlaylist = {
        playlist: {
            name: plData.name,
            description: plData.description,
            id: plData.id,
            public: plData.public,
            ownerId: plData.owner.id,
            ownerName: plData.owner.display_name,
            images: plData.images,
            etag: plData.snapshot_id,
            length: plData.tracks.total,
            type: plData.type,
        },
        tracks: []
    }

    return {
        status: 200,
        data: retplaylist
    }
}











function pushSpotifyTrackSongIdsToArray(idArray: string[], items: SpotifyTrackBundleItem[]) {
    if (!idArray || !items) {
        return;
    }
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        if (item?.track.id) {
            idArray.push(item.track.id);
        }
    }
}