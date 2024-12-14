import React from "react";
import "./App.css";
import Home from "./pages/Home";
import bg from "./pictures/background.jpg"


function App() {
  return (
    <div style={{
      backgroundImage: `url(${bg})`,
    }}  className="App" >
      <h1>👋 Welcome to the Star Wars GraphQL API! ⚫🤖⚔️</h1>
      <Home />
    </div>
  );
}

export default App;
