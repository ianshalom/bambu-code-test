import React, { Component } from "react";
import "./ohlc.css";

class OHLC extends Component {
  componentDidMount() {
    if (this.props.data) {
      this.canvasInit();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.canvasInit();
    }
  }

  // Get max val
  maxValue() {
    let maxVal = 0;
    let data = this.props.data;
    for (let i = 0; i < data.length; i++) {
      let tempVal = Math.max(data[i].high, data[i].low);
      maxVal = Math.max(tempVal, maxVal);
    }
    return maxVal;
  }
  // Get min val
  minValue() {
    let minVal;
    let data = this.props.data;
    for (let i = 1; i < data.length; i++) {
      minVal = Math.min(data[i].high, data[i].low);
    }
    return minVal;
  }

  // Get labels
  getLabels() {
    return this.props.data.map((month) => {
      return { x: month.month };
    });
  }

  convertMonth(month) {
    switch (month) {
      case 1:
        if (month === 1) return "JAN";
        break;
      case 2:
        if (month === 2) return "FEB";
        break;
      case 3:
        if (month === 3) return "MAR";
        break;
      case 4:
        if (month === 4) return "APR";
        break;
      case 5:
        if (month === 5) return "MAY";
        break;
      case 6:
        if (month === 6) return "JUN";
        break;
      case 7:
        if (month === 7) return "JUL";
        break;
      case 8:
        if (month === 8) return "AUG";
        break;
      case 9:
        if (month === 9) return "SEP";
        break;
      case 10:
        if (month === 10) return "OCT";
        break;
      case 11:
        if (month === 11) return "NOV";
        break;
      case 12:
        if (month === 12) return "DEC";
        break;
      default:
        return month;
    }
  }

  //Initialise Canvas
  canvasInit() {
    let graph;
    graph = document.getElementById("graph");
    let context = graph.getContext("2d");
    let maxVal = this.maxValue();
    let minVal = this.minValue();

    console.log(this.props.data);

    let chartInfo = {
      y: { min: minVal - 10, max: maxVal + 10 },
    };

    //Labels (x axis)
    let labels = this.getLabels();

    context.lineWidth = 3;
    context.strokeStyle = "#333";
    context.font = "italic 8pt sans-serif";
    context.textAlign = "center";

    let data = this.props.data;
    let CHART_PADDING = 30;
    let width = graph.width;
    let height = graph.height;

    // Add stock
    // Helper variables
    let elementWidth = (width - CHART_PADDING * 2) / data.length;
    let startY = CHART_PADDING;
    let endY = height - CHART_PADDING;
    let chartHeight = endY - startY;
    let stepSize = chartHeight / (chartInfo.y.max - chartInfo.y.min);
    let openY;
    let closeYOffset;
    let highY;
    let lowY;
    let currentX;

    // X pixel graph point
    function getXPixel(val) {
      return ((width - CHART_PADDING) / 13) * val + CHART_PADDING;
    }

    // Y pixel graph point
    function getYPixel(val) {
      return height - ((height - CHART_PADDING) / maxVal) * val - CHART_PADDING;
    }

    // Draw the X value texts
    for (var i = 0; i < labels.length; i++) {
      context.fillText(
        this.convertMonth(labels[i].x),
        getXPixel(labels[i].x),
        height - CHART_PADDING + 20
      );
    }

    // Draw the Y value texts
    context.textAlign = "right";
    context.textBaseline = "middle";

    // Set Y-axis labels to be dynamic
    let count;
    let difference = maxVal - minVal;
    if (difference < 50) {
      count = 10;
    } else if (difference <= 100) {
      count = 20;
    } else if (difference < 200) {
      count = 50;
    } else if (difference < 500) {
      count = 100;
    } else {
      count = 200;
    }

    for (var j = 0; j < maxVal; j += count) {
      context.fillText("$ " + j, CHART_PADDING + 4, getYPixel(j));
    }

    for (let i = 0; i < data.length; i++) {
      openY = (data[i].open - chartInfo.y.min) * stepSize;

      //Determines whether market is bullish or bearish
      closeYOffset = (data[i].open - data[i].close) * stepSize;
      highY = (data[i].high - chartInfo.y.min) * stepSize;
      lowY = (data[i].low - chartInfo.y.min) * stepSize;
      context.beginPath();
      currentX = CHART_PADDING + elementWidth * (i + 0.5);
      context.moveTo(currentX, endY - highY);
      context.lineTo(currentX, endY - lowY);
      context.moveTo(currentX, endY - openY);
      context.lineTo(CHART_PADDING + elementWidth * (i + 0.25), endY - openY);
      context.moveTo(currentX, endY - openY + closeYOffset);
      context.lineTo(
        CHART_PADDING + elementWidth * (i + 0.75),
        endY - openY + closeYOffset
      );
      context.strokeStyle = closeYOffset < 0 ? "#C2D985" : "#E3675C";
      context.stroke();
    }

    // console.log(this.props.data);
  }

  render() {
    return <canvas width="900" height="700" id="graph"></canvas>;
  }
}

export default OHLC;
//##########################################
// var graph;
// var xPadding = 50;
// var yPadding = 30;

// // Notice I changed The X values
// var data = {
//   values: [
//     { X: 1, Y: 12 },
//     { X: 2, Y: 28 },
//     { X: 3, Y: 18 },
//     { X: 4, Y: 34 },
//     { X: 5, Y: 40 },
//     { X: 6, Y: 80 },
//     { X: 7, Y: 80 },
//     { X: 8, Y: 18 },
//     { X: 9, Y: 34 },
//     { X: 10, Y: 40 },
//     { X: 11, Y: 1090 },
//     { X: 12, Y: 90 },
//   ],
// };

// // Returns the max Y value in our data list
// function getMaxY() {
//   var max = 0;

//   for (var i = 0; i < data.values.length; i++) {
//     if (data.values[i].Y > max) {
//       max = data.values[i].Y;
//     }
//   }

//   max += 10 - (max % 10);
//   return max;
// }

// // Returns the max X value in our data list
// function getMaxX() {
//   var max = 0;

//   for (var i = 0; i < data.values.length; i++) {
//     if (data.values[i].X > max) {
//       max = data.values[i].X;
//     }
//   }

//   max += 10 - (max % 10);
//   return max;
// }

// // Return the x pixel for a graph point
// function getXPixel(val) {
//   // uses the getMaxX() function
//   return ((graph.width - xPadding) / getMaxX()) * val + xPadding * 1.5;
// }

// // Return the y pixel for a graph point
// function getYPixel(val) {
//   return (
//     graph.height - ((graph.height - yPadding) / getMaxY()) * val - yPadding
//   );
// }

// graph = document.getElementById("graph");
// var c = graph.getContext("2d");

// c.lineWidth = 2;
// c.strokeStyle = "#333";
// c.font = "italic 8pt sans-serif";
// c.textAlign = "center";

// // Draw the axises
// c.beginPath();
// c.moveTo(xPadding, 0);
// c.lineTo(xPadding, graph.height - yPadding);
// c.lineTo(graph.width, graph.height - yPadding);
// c.stroke();

// // Draw the X value texts
// for (var i = 0; i < data.values.length; i++) {
//   // uses data.values[i].X
//   c.fillText(
//     data.values[i].X,
//     getXPixel(data.values[i].X),
//     graph.height - yPadding + 20
//   );
// }

// // Draw the Y value texts
// c.textAlign = "right";
// c.textBaseline = "middle";

// for (var j = 0; j < getMaxY(); j += 100) {
//   c.fillText(j, xPadding - 10, getYPixel(j));
// }

// c.strokeStyle = "#f00";
// }

// render() {
// // console.log(this.state.data);
// console.log(this.props.data);
// return <canvas width="750" height="500" id="graph"></canvas>;
// }
