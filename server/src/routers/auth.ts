import express, { Express, Request, Response } from "express";
import axios from "axios";
import { stat } from "fs";
import dotenv from "dotenv";

export const AuthRouter = express.Router();

dotenv.config();
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const CLIENT_ID = '58be630dba4c4c788643b5c8f7321a88';
const REDIRECT_URL = 'http://localhost:1080/callback';


AuthRouter.get('/gentoken', async (req: Request, res: Response) => {
    console.log('gentoken start');
    const code = req.query['code'];
    const state = req.query['state'];
    if (!code) {
        res.status(400).send('code not provided');
        console.log('gentoken 400 - code');
        return;
    }
    
    if (!state) {
        res.status(400).send('state not provided');
        console.log('gentoken 400 - state');
        return;
    }

    let basicStr = (Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'));

    let response = await axios.post('https://accounts.spotify.com/api/token', {
        code: code,
        state: state,
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
        console.log('gentoken 401: ' + response.status);
        console.log('more info: ' + response.data);
        return;
    }

    console.log('gentoken 200');
    res.send({
        token: response.data.access_token,
        refresh: response.data.refresh_token,
        expires: response.data.expires_in,
        scopes: response.data.scope,
    });

});