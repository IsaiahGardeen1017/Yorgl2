import express, {Express, Request, Response} from "express";
import { handleNowPlaying } from "../apis/spotify/nowPlaying";
import { handleSetPlayState } from "../apis/spotify/playerInteractions";

export const SpotifyRouter = express.Router();

handleNowPlaying(SpotifyRouter);
handleSetPlayState(SpotifyRouter);
