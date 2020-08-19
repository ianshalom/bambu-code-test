import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import Stocks from "./components/stocks/stocks";

const API_KEY = process.env.REACT_APP_ALPHA_API_KEY;

class App extends Component {
  state = {};

  componentDidMount() {
    axios
      .get(
        // `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=NFLX&apikey=${API_KEY}`
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=GOOG&apikey=${API_KEY}`
      )
      .then((res) => {
        console.log(res.data);
      });
  }
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
