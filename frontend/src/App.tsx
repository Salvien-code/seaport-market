import React from "react";
import logo from "./opensea.png";
import { ConnectButton } from "web3uikit";
import "./App.css";

function App() {
  return (
  <div className="header">
    <div className="logo">
      <img src={logo} alt="logo" height="50px" />
    </div>
    Seaport Protocol Trading
    <ConnectButton />
  </div>
  );
}

export default App;
