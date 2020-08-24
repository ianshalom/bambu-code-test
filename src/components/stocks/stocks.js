import React, { Component } from "react";
import axios from "axios";
import OHLC from "./graph/Ohlc";
import "./Stocks.css";
import Spinner from "../UI/Spinner";

const API_KEY = process.env.REACT_APP_ALPHA_API_KEY;
const YEAR = 2019;
const STOCKS = [
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
];
class Stocks extends Component {
  state = {
    data: [],
    newQuery: false,
    isLoading: false,
    currentStock: null,
  };

  componentDidMount() {
    const currentStock = localStorage.getItem("currentStock");
    if (currentStock) {
      this.fetchCompanyData(currentStock);
    }
  }

  //Fetch data based on company clicked.
  fetchCompanyData = async (companyName) => {
    this.setState({ currentStock: companyName });

    this.isLoading();
    await axios
      .get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${companyName}&apikey=${API_KEY}`
      )
      .then((res) => {
        const data = res.data["Monthly Time Series"];
        localStorage.setItem("currentStock", companyName);
        //Filter data by year 2019
        //Simplified key names and converted string values into numbers.
        const arrYear = Object.keys(data)
          .filter((v) => v.includes(YEAR))
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
          isLoading: false,
        });
      })
      .catch((err) => {
        console.error(err);
        this.setState({
          isLoading: false,
        });
      });
  };

  isLoading = () => {
    this.setState({ isLoading: true });
  };

  resetData = () => {
    this.setState({ data: [], newQuery: false });
  };

  render() {
    const individualStock = STOCKS.map((stock) => {
      return (
        <button
          type="submit"
          key={stock}
          value={stock}
          onClick={(event) => {
            this.fetchCompanyData(event.target.value);
          }}
          className={`stock-button ${
            stock === this.state.currentStock && "active"
          }`}
        >
          {stock}
        </button>
      );
    });

    let ohlcGraph;
    if (this.state.isLoading) {
      ohlcGraph = <Spinner />;
    } else {
      ohlcGraph = <OHLC data={this.state.data} resetData={this.resetData} />;
    }

    return (
      <div className="stocks-container">
        <div className="button-container">{individualStock}</div>
        {!this.state.currentStock && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Select a stock to view its data.
          </div>
        )}
        <div className="chart-container">{ohlcGraph}</div>
      </div>
    );
  }
}
export default Stocks;
