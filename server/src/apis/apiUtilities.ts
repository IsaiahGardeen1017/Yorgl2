import { Request} from "express"
import axios from "axios";

export type UrlParams = {
    [key:string]: string
}

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

export type RequestDetails = {
    url: string,
    authToken: string,
    urlParams?: UrlParams,
    method?: Method
}

export type ResponseObj<T = any> = {
    status: number,
    data?: T,
    errMessage?: string
}

const SPOTIFY_BASE_URL = 'https://api.spotify.com';

export async function callSpotifyApi(requestDetails: RequestDetails): Promise<ResponseObj> {
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