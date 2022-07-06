const { getAccessToken } = require("../../services/cache");
const getArtists = require("../../services/sgArtists");
const { getArtistID, getTopTracks } = require("../../services/spotify");

const getSetlistData = async (req) => {
  const { zipCode, gteDate, lteDate } = req.query;
  // if user token, use that otherwise default to server auth
  const clientToken = await getAccessToken();

  try {
    const artistArray = await getArtists(zipCode, gteDate, lteDate);

    const artistIDs = await Promise.all(
      artistArray.map((band) => getArtistID(band, clientToken))
    );

    const setlistData = async () => {
      const topTracks = [];

      for (let index = 0; index < artistIDs.length; index++) {
        if (!artistIDs[index]) {
          continue;
        }
        const element = await getTopTracks(
          artistIDs[index].artist,
          artistIDs[index].artistID,
          clientToken
        );

        element.forEach(({ artist, trackName, trackID }) => {
          topTracks.push({ artist, trackName, trackID });
        });
      }

      return topTracks;
    };

    const data = await setlistData();

    return data;
  } catch (error) {
    console.error("An error occured while creating the Setlist: ", error);
  }
};

module.exports = getSetlistData;
