/* eslint-disable prettier/prettier */
export const getParseSearch = (response) => {
  let newAlbumsParsedList = [];
  let newArtistsParsedList = [];
  let newTracksParsedList = [];

  if (response.albums) {
    newAlbumsParsedList = getAlbumsParsed({ albumsList: response.albums });
  }

  if (response.artists) {
    newArtistsParsedList = getArtistParsed({ artistList: response.artists });
  }

  if (response.tracks) {
    newTracksParsedList = getTracksParsed({ tracksList: response.tracks });
  }
  return { newAlbumsParsedList, newArtistsParsedList, newTracksParsedList };
};

export const getAlbumsParsed = ({ albumsList }) => {
  const newAlbumsParsedList = [];

  if (albumsList.items && albumsList.items.length >= 1) {
    albumsList.items.forEach((itemObj) => {
      let newItemObj = {};
      newItemObj["id"] = itemObj.id ? itemObj.id : "";
      newItemObj["type"] = itemObj.type ? itemObj.type : "";
      newItemObj["album_type"] = itemObj.album_type ? itemObj.album_type : "";
      newItemObj["name"] = itemObj.name ? itemObj.name : "";
      newItemObj["releaseDate"] = itemObj.release_date
        ? itemObj.release_date
        : "";
      newItemObj["numberOfTracks"] = itemObj.total_tracks
        ? itemObj.total_tracks
        : "";
      newItemObj["linkToOpen"] = itemObj.external_urls?.spotify
        ? itemObj.external_urls?.spotify
        : "";

      if (itemObj.images) {
        if (itemObj.images.length >= 1) {
          newItemObj["img"] = itemObj.images[0]?.url
            ? itemObj.images[0]?.url
            : "";
        }
      } else {
        newItemObj["img"] = "";
      }

      if (itemObj.artists.length >= 1) {
        let albumArtistsToParse = { items: itemObj.artists };
        newItemObj["artist"] = getArtistParsed({
          artistList: albumArtistsToParse
        });
      }

      newAlbumsParsedList.push(newItemObj);
    });
  }

  return newAlbumsParsedList;
};

export const getArtistParsed = ({ artistList }) => {
  const newArtistsParsedList = [];

  if (artistList.items && artistList.items.length >= 1) {
    artistList.items.forEach((itemObj) => {
      let newItemObj = {};
      newItemObj["id"] = itemObj.id ? itemObj.id : "";
      newItemObj["type"] = itemObj.type ? itemObj.type : "";
      newItemObj["popularity"] = itemObj.popularity ? itemObj.popularity : "";
      newItemObj["name"] = itemObj.name ? itemObj.name : "";
      newItemObj["linkToOpen"] = itemObj.external_urls?.spotify
        ? itemObj.external_urls?.spotify
        : "";
      newItemObj["genericOfMusic"] = itemObj.genres ? itemObj.genres : "";
      newItemObj["followers"] = itemObj.followers?.total
        ? itemObj.followers?.total
        : "";

      if (itemObj.images) {
        if (itemObj.images.length >= 1) {
          newItemObj["img"] = itemObj.images[0]?.url
            ? itemObj.images[0]?.url
            : "";
        }
      } else {
        newItemObj["img"] = "";
      }

      newArtistsParsedList.push(newItemObj);
    });
  }

  return newArtistsParsedList;
};

export const getTracksParsed = ({ tracksList }) => {
  const newTracksParsedList = [];

  if (tracksList.items && tracksList.items.length >= 1) {
    tracksList.items.forEach((itemObj) => {
      let newItemObj = {};
      newItemObj["id"] = itemObj.id ? itemObj.id : "";
      newItemObj["type"] = itemObj.type ? itemObj.type : "";
      newItemObj["popularity"] = itemObj.popularity ? itemObj.popularity : "";
      newItemObj["name"] = itemObj.name ? itemObj.name : "";
      newItemObj["linkToOpen"] = itemObj.external_urls?.spotify
        ? itemObj.external_urls?.spotify
        : "";
      newItemObj["explicit"] = itemObj.explicit ? itemObj.explicit : "";
      newItemObj["duration"] = itemObj.duration_ms
        ? milisToMinutesAndSeconds(itemObj.duration_ms)
        : "";

      if (itemObj.artists.length >= 1) {
        let trackAlbumsToParse = { items: [itemObj.album] };
        let trackArtistsToParse = { items: itemObj.artists };
        newItemObj["album"] = getAlbumsParsed({
          albumsList: trackAlbumsToParse
        });
        newItemObj["artist"] = getArtistParsed({
          artistList: trackArtistsToParse
        });
      }
      if (itemObj.album.images.length >= 1) {
        newItemObj["img"] = itemObj.album.images[0]?.url
          ? itemObj.album.images[0]?.url
          : "";
      }

      newTracksParsedList.push(newItemObj);
    });
  }

  return newTracksParsedList;
};

function milisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}
