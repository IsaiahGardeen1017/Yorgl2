import express, {Express, Request, Response} from "express";
import { handleNowPlaying } from "../apis/spotify/nowPlaying";

export const SpotifyRouter = express.Router();

handleNowPlaying(SpotifyRouter);

