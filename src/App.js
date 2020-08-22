import React, { Component } from "react";
import "./App.css";
import Header from "./components/header/header";
import Stocks from "./components/stocks/stocks";
import Footer from "./components/footer/footer";

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
