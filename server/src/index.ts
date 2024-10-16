import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { DuckRouter } from './routers/duckRouter';
import { AuthRouter } from './routers/auth';
import { SpotifyRouter } from "./routers/spotifyRouter";

dotenv.config();

const app: Express = express();
const port = process.env.BACKEND_PORT;

app.use('/auth', AuthRouter);
app.use('/api', SpotifyRouter);


const defaultBasicFun = (req, res) => {
    console.log(req.url + ' not handled');
};
app.get('*', defaultBasicFun);
app.put('*', defaultBasicFun);
app.post('*', defaultBasicFun);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

