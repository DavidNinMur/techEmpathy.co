/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAlbumFromArtist } from "@/api/spotify";

import { cloneObj } from "@/computation/utils.js";

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

export const getDataToRenderer = ({ store, actualFilterRefStr }) => {
  let newDataToShowList = [];
  if (store.state.albums.length <= 0) {
    return newDataToShowList;
  }

  const albumsList = cloneObj(store.state.albums);
  const artistList = cloneObj(store.state.artists);
  const tracksList = cloneObj(store.state.tracks);

  switch (actualFilterRefStr) {
    case "all":
      newDataToShowList.push(albumsList.concat(artistList.concat(tracksList)));
      break;

    case "album":
      newDataToShowList.push(albumsList);
      break;

    case "artist":
      newDataToShowList.push(artistList);
      break;

    case "track":
      newDataToShowList.push(tracksList);
      break;

    default:
      break;
  }
  return newDataToShowList;
};
