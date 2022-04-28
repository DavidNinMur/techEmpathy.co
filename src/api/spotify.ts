export const getAuth = (): Promise<SpotifyAuthResponse> => {
  const BASE64_ENCODED_AUTH_CODE = `${process.env.VUE_APP_CLIENT_ID}:${process.env.VUE_APP_CLIENT_SECRET}`;

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseResponse(response: Response): Promise<any> {
  if (!response.ok) throw Error(`RequestStatus: ${response.status}`);
  return response.json();
}

interface SpotifyAuthResponse {
  access_token: string;
  expires_in: 3600;
  token_type: string;
}
