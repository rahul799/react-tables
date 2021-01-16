import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import WorldCupData from "./components/WorldCupData";
import TwitterData from "./components/TwitterData";
import VotingData from "./components/VotingData";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <div className="container-fluid mt-5">
        <h1>World Cup Data</h1>
        <WorldCupData />
        <h1>Twitter Data</h1>
        <TwitterData />
        <h1>Voting Data</h1>
        <VotingData />
      </div>
    </>
  );
}

export default App;
