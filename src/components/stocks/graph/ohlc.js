import React, { Component } from "react";
import "./ohlc.css";

class OHLC extends Component {
  componentDidMount() {
    this.canvasInit();
  }
  canvasInit() {
    var graph;
    var xPadding = 50;
    var yPadding = 30;

    // Notice I changed The X values
    var data = {
      values: [
        { X: 1, Y: 12 },
        { X: 2, Y: 28 },
        { X: 3, Y: 18 },
        { X: 4, Y: 34 },
        { X: 5, Y: 40 },
        { X: 6, Y: 80 },
        { X: 7, Y: 80 },
        { X: 8, Y: 18 },
        { X: 9, Y: 34 },
        { X: 10, Y: 40 },
        { X: 11, Y: 1090 },
        { X: 12, Y: 90 },
      ],
    };

    // Returns the max Y value in our data list
    function getMaxY() {
      var max = 0;

      for (var i = 0; i < data.values.length; i++) {
        if (data.values[i].Y > max) {
          max = data.values[i].Y;
        }
      }

      max += 10 - (max % 10);
      return max;
    }

    // Returns the max X value in our data list
    function getMaxX() {
      var max = 0;

      for (var i = 0; i < data.values.length; i++) {
        if (data.values[i].X > max) {
          max = data.values[i].X;
        }
      }

      max += 10 - (max % 10);
      return max;
    }

    // Return the x pixel for a graph point
    function getXPixel(val) {
      // uses the getMaxX() function
      return ((graph.width - xPadding) / getMaxX()) * val + xPadding * 1.5;
    }

    // Return the y pixel for a graph point
    function getYPixel(val) {
      return (
        graph.height - ((graph.height - yPadding) / getMaxY()) * val - yPadding
      );
    }

    graph = document.getElementById("graph");
    var c = graph.getContext("2d");

    c.lineWidth = 2;
    c.strokeStyle = "#333";
    c.font = "italic 8pt sans-serif";
    c.textAlign = "center";

    // Draw the axises
    c.beginPath();
    c.moveTo(xPadding, 0);
    c.lineTo(xPadding, graph.height - yPadding);
    c.lineTo(graph.width, graph.height - yPadding);
    c.stroke();

    // Draw the X value texts
    for (var i = 0; i < data.values.length; i++) {
      // uses data.values[i].X
      c.fillText(
        data.values[i].X,
        getXPixel(data.values[i].X),
        graph.height - yPadding + 20
      );
    }

    // Draw the Y value texts
    c.textAlign = "right";
    c.textBaseline = "middle";

    for (var j = 0; j < getMaxY(); j += 100) {
      c.fillText(j, xPadding - 10, getYPixel(j));
    }

    c.strokeStyle = "#f00";
  }

  render() {
    // console.log(this.state.data);
    console.log(this.props.data);
    return <canvas width="750" height="500" id="graph"></canvas>;
  }
}

export default OHLC;
