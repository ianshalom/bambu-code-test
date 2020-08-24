import React, { Component } from "react";
import "./ohlc.css";

class OHLC extends Component {
  state = {
    data: this.props.data,
  };

  componentDidMount() {
    if (this.state.data) {
      this.canvasInit();
    }
  }

  // Get max val
  maxValue() {
    let maxVal = 0;
    let data = this.state.data;
    for (let i = 0; i < data.length; i++) {
      let tempVal = Math.max(data[i].high, data[i].low);
      maxVal = Math.max(tempVal, maxVal);
    }
    return maxVal;
  }
  // Get min val
  minValue() {
    let minVal;
    let data = this.state.data;
    for (let i = 1; i < data.length; i++) {
      minVal = Math.min(data[i].high, data[i].low);
    }
    return minVal;
  }

  // Get labels
  getLabels() {
    return this.state.data.map((month) => {
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

    console.log(this.state.data);

    let chartInfo = {
      y: { min: minVal - 10, max: maxVal + 10 },
    };

    //Labels (x axis)
    let labels = this.getLabels();

    context.lineWidth = 3;
    context.strokeStyle = "#333";
    context.font = "italic 8pt sans-serif";
    context.textAlign = "center";

    let data = this.state.data;
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
