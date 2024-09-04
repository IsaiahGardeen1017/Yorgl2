

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
  
