import React from "react";

import "./App.css";
import Search from "../components/Search";

const App = () => {
  const handleLogin = () =>
    (window.location.href = "http://localhost:8000/login");

  return (
    <div className="App">
      <Search />
      <button onClick={() => handleLogin()}>Login</button>
    </div>
  );
};

export default App;
