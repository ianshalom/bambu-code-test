import React, { Component } from "react";
import axios from "axios";
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
  };

  onClickHandler = (event) => {
    console.log(event.target.value);
    axios
      .get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${event.target.value}&apikey=${API_KEY}`
      )
      .then((res) => {
        console.log(res.data);
      });
  };

  render() {
    console.log(this.state.stocks);

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

    return <div>{individualStock}</div>;
  }
}
export default Stocks;
