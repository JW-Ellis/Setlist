import React, { useState, useEffect } from "react";

import "./App.css";
import { Button } from "@chakra-ui/react";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const paramObject = new URLSearchParams(window.location.search)
   
    if (paramObject.has("access_token") && paramObject.has("refresh_token")) {
      setAccessToken(paramObject.get("access_token"));
      setRefreshToken(paramObject.get("refresh_token"));
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
