import { NowPlayingResponse } from "../../apis/spotify/nowPlaying";
import { SpotifyPlaybackStateResponse } from "../../types/Spotify/types";
const axios = require('axios');



export async function getPlayerMe(authToken: string): Promise<NowPlayingResponse>{
    let spotifyResponse: SpotifyPlaybackStateResponse;
    try {
        let response = await axios({
            method: 'get',
            url: 'https://api.spotify.com/v1/me/player',
            params: { market: 'US' },
            headers: { 'Authorization': 'Bearer ' + authToken },
        });
        spotifyResponse = response.data;
    } catch (err: any) {
        return undefined;
    }
    
    if(spotifyResponse === undefined){
        return undefined;
    }

    let returnResponse: NowPlayingResponse = {
        deviceName: spotifyResponse.device?.name,
        is_playing: spotifyResponse.is_playing,
        track: spotifyResponse.item ? {
            album: spotifyResponse.item.album ? {
                href: spotifyResponse.item.album.href,
                id: spotifyResponse.item.album.id,
                images: spotifyResponse.item.album.images,
                name: spotifyResponse.item.album.name,
                releaseDate: spotifyResponse.item.album.release_date
            } : undefined,
            artists: spotifyResponse.item.artists,
            id: spotifyResponse.item.id,
            href: spotifyResponse.item.href,
            name: spotifyResponse.item.name
        } : undefined
    }

    return returnResponse;
};