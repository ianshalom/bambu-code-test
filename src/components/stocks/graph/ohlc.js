import React, { Component } from "react";
import "./ohlc.css";

class OHLC extends Component {
  render() {
    console.log(this.props.data);
    return <div id="ohlc">OHLC CHART</div>;
  }
}

export default OHLC;
