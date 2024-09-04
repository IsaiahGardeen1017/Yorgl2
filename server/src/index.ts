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

app.get('*', (req, res) => {
    console.log(req.url);
    console.log('what?');
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

