import React, { Component } from "react";
import axios from "axios";
import OHLC from "./graph/Ohlc";
import "./Stocks.css";

const API_KEY = process.env.REACT_APP_ALPHA_API_KEY;

class Stocks extends Component {
  state = {
    stocks: [
      "MSFT",
      "AAPL",
      "INTC",
      "NFLX",
      "ORCL",
      "CMCSA",
      "GOOG",
      "LUV",
      "HOG",
      "GOOGL",
      "AMZN",
    ],
    data: [],
    newQuery: false,
  };

  //Fetch data based on companay.
  onClickHandler = async (event) => {
    const companyName = event.target.value;
    await axios
      .get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${companyName}&apikey=${API_KEY}`
      )
      .then((res) => {
        const data = res.data["Monthly Time Series"];

        //Filter data by year 2019
        //Simplified key names and converted string values into numbers.
        const arrYear = Object.keys(data)
          .filter((v) => v.includes("2019"))
          .map((key) => ({
            open: Number(data[key]["1. open"]),
            high: Number(data[key]["2. high"]),
            low: Number(data[key]["3. low"]),
            close: Number(data[key]["4. close"]),
            month: Number(key.split("-")[1]),
          }));

        if (this.state.newQuery) {
          this.resetData();
        }

        this.setState({
          data: arrYear,
          newQuery: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  resetData = () => {
    this.setState({ data: [], newQuery: false });
  };

  render() {
    const individualStock = this.state.stocks.map((stock) => {
      return (
        <button
          type="submit"
          key={stock}
          value={stock}
          onClick={this.onClickHandler}
          className="stock-button"
        >
          {stock}
        </button>
      );
    });

    let ohlcGraph;
    if (this.state.newQuery) {
      ohlcGraph = <OHLC data={this.state.data} resetData={this.resetData} />;
    }

    return (
      <div className="stocks-container">
        <div className="button-container">{individualStock}</div>
        <div className="chart-container">{ohlcGraph}</div>
      </div>
    );
  }
}
export default Stocks;
