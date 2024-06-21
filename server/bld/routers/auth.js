"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
exports.AuthRouter = express_1.default.Router();
const CLIENT_SECRET = '0657e4bfb075460fb0467fa44d5d14a2';
const CLIENT_ID = '58be630dba4c4c788643b5c8f7321a88';
const REDIRECT_URL = 'http://localhost:1080/callback';
exports.AuthRouter.get('/gentoken', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const code = req.query['code'];
    const state = req.query['state'];
    if (!code) {
        res.status(400).send('code not provided');
        return;
    }
    if (!code) {
        res.status(400).send('state not provided');
        return;
    }
    let basicStr = (Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'));
    let response = yield axios_1.default.post('https://accounts.spotify.com/api/token', {
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
}));
