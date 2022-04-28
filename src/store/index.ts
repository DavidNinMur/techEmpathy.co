import { createStore } from "vuex";
import { getAuth, search } from "@/api/spotify";

export default createStore<StoreState>({
  state() {
    return {
      token: {
        value: "",
        expiresAt: 0,
      },
      artists: [],
      albums: [],
      tracks: [],
    };
  },
  getters: {},
  mutations: {
    setArtists(state, artists: Artist[] = []): void {
      state.artists = artists;
    },
    setAlbums(state, albums: Album[] = []): void {
      state.albums = albums;
    },
    setTracks(state, tracks: Track[] = []): void {
      state.tracks = tracks;
    },
    setToken(state, token: AuthToken): void {
      state.token = token;
    },
  },
  actions: {
    async search({ state, commit, dispatch }, query: string): Promise<void> {
      if (!state.token.value || state.token.expiresAt < Date.now()) {
        await dispatch("authorize");
      }
      const { artists, albums, tracks } = await search(
        state.token.value,
        query
      );
      commit("setArtists", artists?.items);
      commit("setAlbums", albums?.items);
      commit("setTracks", tracks?.items);
    },
    async authorize({ commit }): Promise<void> {
      const { expires_in, access_token } = await getAuth();
      commit("setToken", <AuthToken>{
        expiresAt: Date.now() + expires_in,
        value: access_token,
      });
    },
  },
});

export type Artist = Partial<SpotifyApi.ArtistObjectFull>;
export type Album = Partial<SpotifyApi.AlbumObjectFull>;
export type Track = Partial<SpotifyApi.TrackObjectFull>;

export interface StoreState {
  token: AuthToken;
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

export interface AuthToken {
  value: string;
  expiresAt: number;
}
