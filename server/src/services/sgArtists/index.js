const fetch = require("node-fetch");

const getArtists = async (zipCode, gteDate, lteDate) => {
  try {
    let rawArray = [];

    //find city id and use id to search for artists
    const getArtists = `https://api.seatgeek.com/2/events?client_id=${process.env.MUSIC_ID}&geoip=${zipCode}&per_page=30&taxonomies.name=concert&datetime_local.gte=${gteDate}&datetime_local.lte=${lteDate}`;
    const artistResponse = await fetch(getArtists);
    const artistDate = await artistResponse.json();

    artistDate.events.forEach((performers) => {
      rawArray.push(performers.performers[0].name);
    });

    // Remove duplicate artists
    const artistArray = [...new Set(rawArray)];

    return artistArray;
  } catch (error) {
    console.error("An error occured while fetching artists :", error);
  }
};

module.exports = getArtists;
