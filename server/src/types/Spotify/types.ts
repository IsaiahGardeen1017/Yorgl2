

export type SpotifyPlaybackStateResponse = {
    device: SpotifyDevice;
    shuffle_state: boolean;
    smart_shuffle: boolean;
    repeat_state: string;
    timestamp: number;
    context: SpotifyContext;
    progress_ms: number;
    item: SpotifyTrack;
    currently_playing_type: string;
    actions: SpotifyActions;
    is_playing: boolean;
};

export type SpotifyDevice = {
    id: string;
    is_active: boolean;
    is_private_session: boolean;
    is_restricted: boolean;
    name: string;
    supports_volume: boolean;
    type: string;
    volume_percent: number;
};

export type SpotifyExternalUrls = {
    spotify: string;
};

export type SpotifyImage = {
    height: number;
    url: string;
    width: number;
};

export type SpotifyAlbum = {
    album_type: string;
    artists: SpotifyArtist[];
    available_markets: string[];
    external_urls: SpotifyExternalUrls;
    href: string;
    id: string;
    images: SpotifyImage[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
};

export type SpotifyArtist = {
    external_urls: SpotifyExternalUrls;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
};

export type SpotifyTrack = {
    album: SpotifyAlbum;
    artists: SpotifyArtist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
        isrc: string;
    };
    external_urls: SpotifyExternalUrls;
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
};

export type SpotifyContext = {
    external_urls: SpotifyExternalUrls;
    href: string;
    type: string;
    uri: string;
};

export type SpotifyActions = {
    disallows: {
        resuming: boolean;
    };
};

export type SpotifyPlayListBundle = {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
    items: SpotifyPlaylist[];
};

export type SpotifyPlaylist = {
    collaborative: boolean;
    description: string;
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    images: SpotifyImage[];
    name: string;
    owner: SpotifyOwner;
    public: boolean;
    snapshot_id: string;
    tracks: {
        href: string;
        total: number;
        items?: SpotifyPlaylistTrack[]
    };
    type: string;
    uri: string;
};

export type SpotifyPlaylistTrack = {
    added_at: string;
    added_by: SpotifyOwner;
    is_local: boolean;
    track: SpotifyTrack;

}

export type SpotifyOwner = {
    external_urls: {
        spotify: string;
    };
    followers: {
        href: string;
        total: number;
    };
    href: string;
    id: string;
    type: string;
    display_name: string;
};


export type SpotifyUserProfile = {
    country: string;
    display_name: string;
    email: string;
    explicit_content: {
        filter_enabled: boolean,
        filter_locked: boolean
    };
    external_urls: SpotifyExternalUrls;
    followers: {
        href: string;
        total: number;
    };
    href: string;
    id: string;
    images: SpotifyImage[];
    product: string;
    type: string;
    uri: string;
}


export type SpotifyTrackBundle = {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
    items: SpotifyTrackBundleItem[];
};

export type SpotifyTrackBundleItem = {
    added_at: string;
    added_by: string;
    is_local: string;
    track: SpotifyTrack;
};
