const express = require('express'); 
const app = express();
const bodyParser = require('body-parser'); 
const request = require('request');
const cors = require('cors'); 
const querystring = require('querystring'); 
const cookieParser = require('cookie-parser'); 
const fetch = require('node-fetch'); 
const zipcodes = require('zipcodes'); 
const session = require('express-session'); 
const spotifyApp = require('./spotifyApp');  
const SESS_LIFETIME = 3600000; 
let trackIDS; 
require('dotenv').config(); 

app.set('view engine', 'ejs'); 

const client_id = process.env.SPOTIFY_ID; //Client ID
const client_secret = process.env.SPOTIFY_SEC; //Secret
const redirect_uri = 'http://localhost:3000/callback'; // Redirect uri

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };
  
var stateKey = 'spotify_auth_state';

const redirectLoggedin = (req, res, next) => {
    if(req.session.userToken){
        res.redirect('/loggedin')
    }else{
        next();  
    }
}; 

 app.use(express.static('public'))
   .use(cors())
   .use(express.urlencoded({extended: true}))
   .use(cookieParser()); 

 app.use(session({
    name: process.env.SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESS_SECRET,
    cookie: {
      maxAge: SESS_LIFETIME,
      sameSite: true,
      secure: false
    }
}));  

app.get('/', redirectLoggedin, (req, res) =>{
   
    console.log(trackIDS); 

    res.render('index');  
}); 

app.get('/loggedin',  async(req, res) =>{ 
    let userID; 

    try{
      userID = await spotifyApp.spotifyMe(req.session.userToken);
      
    }
    catch (e){
            console.log('User ID :', e.message); 
        }

console.log(userID); 

res.render('loggedin', {userID: userID});  
    });


app.get('/playlist', (req, res) =>{
    
      
    
    
    res.redirect('/');  
    });   

app.post('/playlist', (req, res) =>{
    let playlistName = req.body.name; 
    let token = req.session.userToken; 

    spotifyApp.spotifyPlaylist(token, trackIDS, playlistName); 
    res.redirect('/playlist'); 
}); 

app.get('/search', async (req, res) =>{
    let artistPush; 
    let userCity; 
    let artist; 

     try {
        
        let sk_key = process.env.SK_API;
        //variables taken from client form submission 
        let userZip = req.query.zip; 
        let userSongcount = req.query.topSong;

        //User day data
        let userDate = req.query.date;
        let fSplit = userDate.split("/");
        let fYear = fSplit[2];
        let fMonth = fSplit[0];
        let fDay = fSplit[1]; 

        console.log(userDate); 

        //Pull coordinate data
        let zipData = zipcodes.lookup(userZip); 
        let lat = zipData.latitude; 
        let lng = zipData.longitude; 
        userCity = zipData.city; 
    
        //find city id and use id to search for artists
        const skCity_url = `https://api.songkick.com/api/3.0/search/locations.json?apikey=${sk_key}&location=geo:${lat},${lng}`; 
        let skCity_response = await fetch(skCity_url);
        let skCitydata = await skCity_response.json(); 
        let cityId = skCitydata.resultsPage.results.location[0].metroArea.id; 
       // console.log(cityId); 
        const skEvent_url = `https://api.songkick.com/api/3.0/metro_areas/${cityId}/calendar.json?min_date=${fYear}-${fMonth}-${fDay}&max_date=${fYear}-${fMonth}-${fDay}&apikey=${sk_key}`
        let skEvent_response = await fetch(skEvent_url);
        let artistData = await skEvent_response.json(); 
       // console.log(artistData.resultsPage.results.event.length); 
        

        //use JSON artistData to make artist array
        let artistsRaw = artistArray(artistData); 
        let artists = [...new Set(artistsRaw)]
        
        function artistArray () {
        artist = []; 
            for (let i = 0; i < artistData.resultsPage.results.event.length; i++){
            if (artistData.resultsPage.results.event[i].performance[0].displayName == 'undefined'){
                continue; 
            } 
            else {
                artist.push(artistData.resultsPage.results.event[i].performance[0].displayName);
            }  
        } 
        console.log(artist); 
        return artist;
        
        };  
    

        //Use artist array to call Spotify API
        try{
            artistPush = await spotifyApp.spotifyTracksids(artists, userSongcount); 
            trackIDS = artistPush[0]; 
        }
        catch (e){
            console.log('Spotify Error:', e.message); 
        } 
      }      
      catch (e){
        console.log('ID Error:', e.message);
        if(artistPush==undefined){
            res.redirect('/'); 
        }
      }

       

      console.log(trackIDS); 

    if(req.session.userToken){
        res.render('playlist', {artistPush: artistPush, userCity: userCity}); 
    }else{
        res.render('search', {artistPush: artistPush, userCity: userCity});
    };
      

}); 

app.get('/login', function(req, res) {

    var state = generateRandomString(16);
    res.cookie(stateKey, state);
  
    // your application requests authorization
    var scope = 'playlist-modify-private playlist-modify-public';
    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      }));
  });
  
  app.get('/callback', function(req, res) {
  
    // your application requests refresh and access tokens
    // after checking the state parameter
  
    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;
    //console.log(req.session); 
    //console.log(req.sessionID); 

    if (state === null || state !== storedState) {
      res.redirect('/#' +
        querystring.stringify({
          error: 'state_mismatch'
        }));
    } else {
      res.clearCookie(stateKey);
      var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: redirect_uri,
          grant_type: 'authorization_code'
        },
        headers: {
          'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
      };
  
      request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
  
          let access_token = body.access_token;

        //put token and userID here
        async function tokenSet () {
          try{

          req.session.userToken = access_token; 
         
         
          }

          catch(e){
            console.log('Token Set Error', e.message); 
          }
        }

        tokenSet(); 
        
        
        // Have the option to pass access token to hash
        if(req.session.userToken){
            res.redirect('/loggedin'); 
        }else{
            res.redirect('/');
        }; 
         

        } else {
          res.redirect('/#' +
            querystring.stringify({
              error: 'invalid_token'
            }));
        }
      });
    }
  });
  
  
  


 
app.listen(3000, () => console.log('listening at 3000')); 



