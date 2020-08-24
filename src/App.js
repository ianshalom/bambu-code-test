import React, { Component } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Stocks from "./components/stocks/Stocks";
import Footer from "./components/footer/Footer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Stocks />
        <Footer />
      </div>
    );
  }
}

export default App;
