import React, { useState } from "react";

import "./App.css";
import Search from "../components/Search";
import Setlist from "../components/Setlist";
import background from "../img/home.jpg";
import { Header } from "semantic-ui-react";

const App = () => {
  const [setlistData, setSetlistData] = useState("");
  const handleLogin = () =>
    (window.location.href = "http://localhost:8000/login");

  const testData = {
    data: {
      location: "Cool Town",
      topTracks: [
        { artist: "Bing Bong", trackName: "christmas", trackId: "234" },
        { artist: "Bing Bong", trackName: "easter", trackId: "2sdf34" },
        { artist: "Bing Bong", trackName: "new christmas", trackId: "2asdf34" },
        { artist: "Bop Boop", trackName: "chari", trackId: "sdg" },
        { artist: "Bop Boop", trackName: "table", trackId: "2352" },
        { artist: "Bop Boop", trackName: "rug", trackId: "7547" },
      ],
    },
  };
  console.log("data; ", setlistData);
  return (
    <div
      className="App"
      style={{
        backgroundimage: `url(${background})`,
      }}
    >
      {setlistData ? (
        <Setlist data={setlistData} setSetlistData={setSetlistData} />
      ) : (
        <div
          className="Search"
          style={{ backgroundImage: `url(${background})` }}
        >
          <div className="header">
            <header>Setlist</header>
            <a href="http://localhost:8000/login" className="login">
              log in
            </a>
            {/* <button onClick={() => handleLogin()}>Login</button> */}
          </div>
          <Search setSetlistData={setSetlistData} />
        </div>
      )}
    </div>
  );
};

export default App;

// Create data state and send it to search component
// when data is populated, show new component
// on playlist, when go back, set data to ""
