/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAlbumFromArtist } from "@/api/spotify";

export const setAlbumFromArtistSelected = async ({
  store,
  artistSelectedObj,
}) => {
  const response = await getAlbumFromArtist(
    store.state.token.value,
    artistSelectedObj.id
  );
  const allAlbumsByUserSearchObj = JSON.parse(JSON.stringify(response));
  return allAlbumsByUserSearchObj.items;
};
