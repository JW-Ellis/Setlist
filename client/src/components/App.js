import React, { useState, useEffect } from "react";

import "./App.css";
import Search from "../components/Search";

import { Button } from "@chakra-ui/react";

const App = () => {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const paramObject = new URLSearchParams(window.location.search);

    if (paramObject.has("access_token") && paramObject.has("refresh_token")) {
      setAccessToken(paramObject.get("access_token"));
      setRefreshToken(paramObject.get("refresh_token"));
      setLoggedIn(true);
    }
  }, []);

  console.log("accessToken: ", accessToken);
  console.log("refreshToken: ", refreshToken);
  console.log("loggedIn: ", loggedIn);

  const handleLogin = () =>
    (window.location.href = "http://localhost:8000/login");

  return (
    <header className="App-header">
      <p>Not logged in</p>

      <Search />
      <Button onClick={handleLogin} colorScheme="blue">
        Login
      </Button>
    </header>
  );
};

export default App;
