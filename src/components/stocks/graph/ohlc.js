import React, { Component } from "react";
import "./Ohlc.css";

const MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

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
    return MONTHS[month - 1];
  }

  // Set Y-axis labels to be dynamic
  yValues(maxVal, minVal) {
    let count;
    let difference = maxVal - minVal;
    if (difference < 50) {
      count = 5;
    } else if (difference <= 100) {
      count = 20;
    } else if (difference < 200) {
      count = 50;
    } else if (difference < 500) {
      count = 100;
    } else {
      count = 200;
    }
    return count;
  }

  //Initialise Canvas
  canvasInit() {
    let graph;
    graph = document.getElementById("graph");
    let context = graph.getContext("2d");
    let maxVal = this.maxValue();
    let minVal = this.minValue();

    let chartInfo = {
      y: { min: minVal, max: maxVal },
      x: { labels: this.getLabels() },
    };

    context.lineWidth = 3;
    context.strokeStyle = "#333";
    context.font = " 10pt Barlow";
    context.textAlign = "center";

    let { data } = this.props;
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

    // Establishes the positions of the OHLC offsets.
    let openY;
    let closeYOffset;
    let highY;
    let lowY;
    let currentX;

    //Loop to get values for the helper variables.
    //Subtract min from value and multiply by step size to ratio to ensure values stay within the chart dimensions.
    for (let i = 0; i < data.length; i++) {
      openY = (data[i].open - chartInfo.y.min) * stepSize;
      //Value of closeYOffset determines whether market is bullish or bearish
      closeYOffset = (data[i].open - data[i].close) * stepSize;
      highY = (data[i].high - chartInfo.y.min) * stepSize;
      lowY = (data[i].low - chartInfo.y.min) * stepSize;

      //Drawing the chart symbol and determining whether the market is bullish ($closing > $opening) or bearish ($closing < $opening)
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

      // Setting chart symbol color depending on whether market is Bullish/Bearish for that particular month.
      context.strokeStyle = closeYOffset < 0 ? "#C2D985" : "#E3675C";
      context.stroke();
    }

    // X pixel graph point
    function getXPixel(val) {
      return ((width - CHART_PADDING) / 12.5) * val;
    }

    // Y pixel graph point
    function getYPixel(val) {
      return height - ((height - CHART_PADDING) / maxVal) * val - CHART_PADDING;
    }

    // Draw the X value texts
    for (var i = 0; i < chartInfo.x.labels.length; i++) {
      context.fillText(
        this.convertMonth(chartInfo.x.labels[i].x),
        getXPixel(chartInfo.x.labels[i].x),
        height - CHART_PADDING + 20
      );
    }

    // Draw the Y value texts
    context.textAlign = "right";
    context.textBaseline = "middle";

    for (var j = 0; j < maxVal; j += this.yValues(maxVal, minVal)) {
      context.fillText("$ " + j, CHART_PADDING + 15, getYPixel(j));
    }
  }

  render() {
    return (
      <canvas
        width="1050"
        height="750"
        id="graph"
        style={{ padding: "10px" }}
      ></canvas>
    );
  }
}

export default OHLC;
