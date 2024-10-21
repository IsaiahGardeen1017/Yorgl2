import { Request } from "express"
import axios from "axios";

export type UrlParams = {
    [key: string]: string
}

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

export type RequestDetails = {
    url: string,
    authToken: string,
    urlParams?: UrlParams,
    method?: Method,
    body?: Object
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
        headers: {
            'Authorization': 'Bearer ' + requestDetails.authToken,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(requestDetails.body),
    }
    try {
        let response = await axios(requestOptions);
        return {
            status: response.status,
            data: response.data
        };
    } catch (err: any) {
        console.log('----------ERROR-------------------------');
        console.log(requestDetails.url);
        console.log(err.message);
        return {
            status: err.response?.status ? err.response.status : 500,
            errMessage: err.message
        };
    }
}