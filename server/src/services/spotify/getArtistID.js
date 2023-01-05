const fetch = require("node-fetch");

const getArtistID = async (artist, token) => {
  try {
    const spotifyResponse = await fetch(
      `https://api.spotify.com/v1/search?q=artist:${encodeURI(
        artist
      )}&type=artist`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const parsedResponse = await spotifyResponse.json();

    if (parsedResponse.artists.items.length === 0) {
      return;
    } else {
      return {
        artistID: parsedResponse.artists.items[0].id,
        artist: parsedResponse.artists.items[0].name,
      };
    }
  } catch (error) {
    console.error(`An error occured while fetching ${artist} ID: `, error);
  }
};

module.exports = getArtistID;
