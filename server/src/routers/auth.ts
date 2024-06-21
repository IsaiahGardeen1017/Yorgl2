import express, { Express, Request, Response } from "express";
import axios from "axios";
import { stat } from "fs";

export const AuthRouter = express.Router();

const CLIENT_SECRET = '0657e4bfb075460fb0467fa44d5d14a2';
const CLIENT_ID = '58be630dba4c4c788643b5c8f7321a88';
const REDIRECT_URL = 'http://localhost:1080/callback';


AuthRouter.get('/gentoken', async (req: Request, res: Response) => {
    console.log('gennign token');
    const code = req.query['code'];
    const state = req.query['state'];
    if (!code) {
        res.status(400).send('code not provided');
        return;
    }

    if (!state) {
        res.status(400).send('state not provided');
        return;
    }

    let basicStr = (Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'));

    let response = await axios.post('https://accounts.spotify.com/api/token', {
        code: code,
        redirect_uri: REDIRECT_URL,
        grant_type: 'authorization_code'
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + basicStr
        },
        validateStatus: () => true,
    });
    if (response.status !== 200) {
        res.status(401).send('Could not generate access token');
        return;
    }

    res.send({
        token: response.data.access_token,
        refresh: response.data.refresh_token,
        expires: response.data.expires_in,
        scopes: response.data.scope,
    });

});