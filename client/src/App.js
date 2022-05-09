import React, { useState, useEffect } from "react";
import queryString from "query-string";

import "./App.css";
import { Button } from "@chakra-ui/react";

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (window.location.search) {
      const { access_token, refresh_token } = queryString.parse(
        window.location.search
      );
      setAccessToken(access_token);
      setRefreshToken(refresh_token);
      setLoggedIn(true);
    }
  }, []);

console.log("accessToken: ", accessToken)
console.log("refreshToken: ", refreshToken)

  const handleLogin = () =>  window.location.href = 'http://localhost:8000/login'

  const notLogged = () => {
    return (
      <header className="App-header">
        <p>Not logged in</p>

        <Button onClick={handleLogin} colorScheme="blue">
          Login
        </Button>
      </header>
    );
  };

  const logged = () => {
    return (
      <header className="App-header">
        <p>Yes logged in</p>

        <Button onClick={handleLogin} colorScheme="red">
          Login
        </Button>
      </header>
    );
  };

  return <div className="App">{loggedIn ? logged() : notLogged()}</div>;
}

export default App;
