import { Router, Request, Response } from "express";
import { SpotifyUserProfile } from "../../types/Spotify/types";
import { callSpotifyApi, ResponseObj } from "../apiUtilities";

export type UserInfoResponse = {
    userId: string;
    userName: string;
    images: {
        url: string;
        width: number;
        height: number;
    }[];
}

export async function handleCurrentUserInfo(router: Router) {
    router.get('/userInfo', async (req: Request, res: Response) => {
        const authToken = req.headers.authorization;
        const built = await getUserInfo(authToken);
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

export async function getUserInfo(authToken: string): Promise<ResponseObj<UserInfoResponse>> {
    const response = await callSpotifyApi({
        url: '/v1/me',
        urlParams: { market: 'US' },
        authToken: authToken
    });

    if (response.status !== 200) {
        return response;
    }
    const userData: SpotifyUserProfile = response.data;
    const returnData: UserInfoResponse = {
        userId: userData.id,
        userName: userData.display_name,
        images: userData.images
    }
    return {
        status: response.status,
        data: returnData
    };
};

