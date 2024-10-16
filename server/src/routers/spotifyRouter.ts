import express, {Express, Request, Response} from "express";
import { handleNowPlaying } from "../apis/spotify/nowPlaying";
import { handleSetPlayState } from "../apis/spotify/playState";
import { handleMyPlaylists } from "../apis/spotify/getPlaylist";
import { handleCurrentUserInfo } from "../apis/spotify/currentUserInfo";
import { handleAddSongs } from "../apis/spotify/addSongsToPlaylist";

export const SpotifyRouter = express.Router();

handleNowPlaying(SpotifyRouter);
handleSetPlayState(SpotifyRouter);
handleMyPlaylists(SpotifyRouter);
handleCurrentUserInfo(SpotifyRouter);
handleAddSongs(SpotifyRouter);