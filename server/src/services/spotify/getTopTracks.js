const fetch = require("node-fetch");

const getTopTracks = async (artist, artistID, token) => {
  let topTracks = [];
  try {
    const spotifyResponse = await fetch(
      `https://api.spotify.com/v1/artists/${artistID}/top-tracks?market=US`,
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

    for (let index = 0; index < 3; index++) {
      topTracks.push({
        artist,
        trackName: parsedResponse.tracks[index].name,
        trackID: parsedResponse.tracks[index].id,
      });
    }

    return topTracks;
  } catch (error) {
    console.error("An error occured while fetching top tracks: ", error);
  }
};

module.exports = getTopTracks;
