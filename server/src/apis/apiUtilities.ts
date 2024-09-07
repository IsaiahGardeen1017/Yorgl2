import { Request} from "express"
import axios from "axios";


export type RequestObj = {
    url: string,
    authToken: string,
    urlParams?: {
        [key:string]: string
    },
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
}

export type ResponseObj<T = any> = {
    status: number,
    data?: T,
    errMessage?: string
}

const SPOTIFY_BASE_URL = 'https://api.spotify.com';

export async function callSpotifyApi(requestDetails: RequestObj): Promise<ResponseObj> {
    let requestOptions = {
        method: requestDetails.method ? requestDetails.method : 'GET',
        url: SPOTIFY_BASE_URL + requestDetails.url,
        params: requestDetails.urlParams,
        headers: { 'Authorization': 'Bearer ' + requestDetails.authToken },
    }
    try {
        let response = await axios(requestOptions);
        return {
            status: response.status,
            data: response.data
        };
    } catch (err: any) {
        return {
            status: err.response.status,
            errMessage: err.message
        };
    }
}