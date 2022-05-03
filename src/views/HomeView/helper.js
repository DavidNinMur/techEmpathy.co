/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getAlbumFromArtist,
  getInfoFromUser,
  getTracksFromUser,
  getArtistFromUser,
} from "@/api/spotify";

import { getAlbumsParsed } from "@/computation/data-parser";

import { cloneObj } from "@/computation/utils.js";

export const setAlbumFromArtistSelected = async ({
  store,
  artistSelectedObj,
}) => {
  const response = await getAlbumFromArtist(
    store.state.token.value,
    artistSelectedObj.id
  );
  const allAlbumsByUserSearchObj = getAlbumsParsed({ albumsList: response });
  return allAlbumsByUserSearchObj;
};

export const setUserInfo = async ({ store, infoStr }) => {
  let response;

  if (infoStr === "artists") {
    response = await getArtistFromUser(store.state.token.value, infoStr);
  } else if (infoStr === "tracks") {
    response = await getTracksFromUser(store.state.token.value, infoStr);
  } else if (infoStr === "infoUser") {
    response = await getInfoFromUser(store.state.token.value, infoStr);
  }

  const allUserInfo = JSON.parse(JSON.stringify(response));
  return allUserInfo.items;
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
