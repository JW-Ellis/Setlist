import React, { useState, useEffect } from 'react';
import queryString from 'query-string';

import './App.css';
import { Button } from '@chakra-ui/react';

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  useEffect(() => {
    if (window.location.search) {
      console.log('logged in!!!');
      const { access_token, refresh_token } = queryString.parse(
        window.location.search
      );
      setAccessToken(access_token);
      setRefreshToken(refresh_token);
      console.log(queryString.parse(window.location.search));
    }
  }, []);

  const handleLogin = () =>  window.location.href = 'http://localhost:8000/login'

  console.log('AFTER');
  console.log('access test:', accessToken);
  console.log('token test: ', refreshToken);

  // console.log('parsed: ', queryString.parse(window.location.search));
  // console.log('queryString: ', access_token);

  return (
    <div className="App">
      <header className="App-header">
        <p>Not logged in</p>

        <Button onClick={handleLogin} colorScheme="blue">
          Login
        </Button>
      </header>
    </div>
  );
}

export default App;

//TODO

//If logged in, show this componenet
//if logged out, show that

//checker is based on hook?
