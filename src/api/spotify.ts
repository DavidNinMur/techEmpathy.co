export const getAuth = (): Promise<SpotifyAuthResponse> => {
  const AUTH_CODE_STR = `${process.env.VUE_APP_CLIENT_ID}:${process.env.VUE_APP_CLIENT_SECRET}`;
  const BASE64_ENCODED_AUTH_CODE = window.btoa(AUTH_CODE_STR);

  return fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${BASE64_ENCODED_AUTH_CODE}`,
    },
    body: new URLSearchParams({
      // Client credentials flow can only request non user data, but it's enough for us
      grant_type: "client_credentials",
    }),
  }).then(parseResponse);
};

export const search = (
  token: string,
  query: string
): Promise<SpotifyApi.SearchResponse> => {
  const itemTypes = ["artist", "album", "track"].join(",");
  return fetch(
    `https://api.spotify.com/v1/search?q=${query}&type=${itemTypes}&include_external=audio`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  ).then(parseResponse);
};

export const getInfoFromUser = async (): Promise<any> => {
  return fetch(`/fixtures/temp/fakeResponseMe.json`).then(parseResponse);
};

export const getTracksFromUser = async (): Promise<any> => {
  return fetch(`/fixtures/temp/fakeResponseTracks.json`).then(parseResponse);
};

export const getArtistFromUser = async (): Promise<any> => {
  return fetch(`/fixtures/temp/fakeResponseArtists.json`).then(parseResponse);
};

export const getAlbumFromArtist = (
  token: string,
  query: string
): Promise<SpotifyApi.SearchResponse> => {
  return fetch(`https://api.spotify.com/v1/artists/${query}/albums`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(parseResponse);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseResponse(response: Response): Promise<any> {
  if (!response.ok) throw Error(`RequestStatus: ${response.status}`);
  return response.json();
}

interface SpotifyAuthResponse {
  access_token: string;
  expires_in: 3600000;
  token_type: string;
}
