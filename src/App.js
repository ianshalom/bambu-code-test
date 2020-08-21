import React, { Component } from "react";
import "./App.css";
import OHLC from "./components/stocks/graph/ohlc";

import Stocks from "./components/stocks/stocks";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>SHALOM</h1>
        <Stocks />
      </div>
    );
  }
}

export default App;
