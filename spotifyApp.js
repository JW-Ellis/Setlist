const SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_ID,
  clientSecret: process.env.SPOTIFY_SEC,
});

exports.spotifyTracksids = async function main(array, num) {
  const arrayHolder = [];
  const trackIds = [];
  const artistTracks = [];

  try {
    // Retrieve and store access token
    const credentials = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(credentials.body.access_token);

    // loop calls to api to gather ids

    const idArray = await Promise.all(
      array.map(async artist => {
        try {
          const artistPull = await spotifyApi.searchArtists(artist);
          const artistParse = artistPull.body.artists.items[0].id;
          arrayHolder.push(artistParse);
        } catch (e) {
          console.log('ID Error:', e.message);
        }
      })
    );

    // use ID to pull top tracks

    const topTracks = await Promise.all(
      arrayHolder.map(async id => {
        try {
          const trackData = await spotifyApi.getArtistTopTracks(id, 'US');
          const trackParse = trackData.body.tracks;

          trackParse.slice(0, num).forEach(track => {
            trackIds.push(track.id);
            artistTracks.push([track.artists[0].name, track.name]);
          });
        } catch (e) {
          console.log('Top Track Error:', e.message);
        }
      })
    );
    console.log(artistTracks);
    return [trackIds, artistTracks];
  } catch (e) {
    console.log('Main Error:', e.message);
  }
};

exports.spotifyPlaylist = async function playlist(
  token,
  idArray,
  playlistName
) {
  const appendID = idArray.map(i => `spotify:track:${i}`);

  try {
    // Retrieve and store access token
    spotifyApi.setAccessToken(token);
    const meData = await spotifyApi.getMe();
    const userID = meData.body.id;
    const playlistData = await spotifyApi.createPlaylist(userID, playlistName, {
      public: false,
    });
    const playlistID = playlistData.body.id;
    spotifyApi.addTracksToPlaylist(playlistID, appendID);
  } catch (e) {
    console.log('Main Error:', e.message);
  }
};

exports.spotifyMe = async function me(token) {
  spotifyApi.setAccessToken(token);

  try {
    const meData = await spotifyApi.getMe();
    const userID = meData.body.display_name;
    return userID;
  } catch (e) {
    console.log('User ID Error: ', e.message);
  }
};
