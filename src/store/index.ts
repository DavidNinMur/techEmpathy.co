import { createStore } from "vuex";
import { getAuth, search } from "@/api/spotify";

import { getParseSearch } from "@/computation/data-parser";

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
      artistDetailSelectedObj: [],
      searchSuggestionList: [
        "Drake",
        "Ed Sheeran",
        "Bad Bunny",
        "The Weekend",
        "Ariana Grande",
        "Justin Bieber",
        "Post Malone",
        "Eminem",
        "Taylor Swift",
        "BTS",
      ], //fake endpoint to know the most listen artist!,
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
    setArtistDetailSelected(state, artistDetailObj: Artist[] = []): void {
      state.artistDetailSelectedObj = artistDetailObj;
    },
  },
  actions: {
    async search({ state, commit, dispatch }, query: string): Promise<void> {
      if (!state.token.value || state.token.expiresAt < Date.now()) {
        await dispatch("authorize");
      }
      const response = await search(state.token.value, query);
      const { newAlbumsParsedList, newArtistsParsedList, newTracksParsedList } =
        getParseSearch(response);

      console.log("newArtistsParsedList :>> ", newArtistsParsedList);
      console.log("newAlbumsParsedList  :>> ", newAlbumsParsedList);
      console.log("newTracksParsedList :>> ", newTracksParsedList);
      commit("setArtists", newArtistsParsedList);
      commit("setAlbums", newAlbumsParsedList);
      commit("setTracks", newTracksParsedList);
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
  searchSuggestionList: Array<string>;
  artistDetailSelectedObj: Artist[];
}

export interface AuthToken {
  value: string;
  expiresAt: number;
}
