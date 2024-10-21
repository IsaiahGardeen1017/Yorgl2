import { Track } from "./Track";

export type Playlist = {
    name: string;
    description: string;
    id: string;
    public: boolean;
    ownerId: string;
    ownerName: string;
    images: {
        url: string;
        width: number;
        height: number;
    }[];
    etag: string;
    length: number;
    type: string;
}

export type PlaylistBundle = {
    playlists: Playlist[],
    total: number
}

export type FullPlaylist = {
    playlist: Playlist,
    tracks: Track[]
}