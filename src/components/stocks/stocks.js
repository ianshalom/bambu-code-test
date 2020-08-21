import React, { Component } from "react";
import axios from "axios";
import OHLC from "./graph/ohlc";

const API_KEY = process.env.REACT_APP_ALPHA_API_KEY;
class Stocks extends Component {
  state = {
    stocks: {
      MSFT: "",
      AAPL: "",
      INTC: "",
      NFLX: "",
      ORCL: "",
      CMCSA: "",
      GOOG: "",
      LUV: "",
      HOG: "",
      GOOGL: "",
      AMZN: "",
    },
    data: [],
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

        //Filter data by year
        const arrYear = Object.keys(data)
          .filter((v) => v.includes("2019"))
          .map((key) => ({ ...data[key], date: key }));

        this.setState({
          data: arrYear,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    console.log(this.state.data);

    const individualStock = Object.keys(this.state.stocks).map((stock) => {
      return (
        <button
          type="submit"
          key={stock}
          value={stock}
          onClick={this.onClickHandler}
        >
          {stock}
        </button>
      );
    });

    return (
      <div>
        {individualStock}

        <div>
          <OHLC data={this.state.data} />
        </div>
      </div>
    );
  }
}
export default Stocks;
