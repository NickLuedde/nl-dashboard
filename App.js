import React from "react";
import Chart from "chart.js";

import CPUGraph from "./CPUGraph";
import NetworkGraph from "./NetworkGraph";
import "./Primary.css";
import "./Charts.css";
import Memory from "./Memory";
import Footer from "./Footer";
import Host_Header from "./Host_Header";

Chart.defaults.global.defaultFontFamily = "Poppins";

function getRandomArray(numItems) {
  // Create random array of objects
  let names = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let data = [];
  for (var i = 0; i < numItems; i++) {
    data.push({
      label: names[i],
      value: Math.round(20 + 80 * Math.random())
    });
  }
  return data;
}

function getRandomDateArray(numItems) {
  // Create random array of objects (with date)
  let data = [];
  let baseTime = new Date("2018-05-01T00:00:00").getTime();
  let dayMs = 24 * 60 * 60 * 1000;
  for (var i = 0; i < numItems; i++) {
    data.push({
      time: new Date(baseTime + i * dayMs),
      value: Math.round(20 + 80 * Math.random())
    });
  }
  return data;
}

async function getDataAPI() {
  // return allData in an array of objects
  //function (isn't working) err => maps is not a function in component....
  let names = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let data = [];
  const response = await fetch(
    "http://18.236.126.230/render?target=icinga2.logic-test-0*.host.hostalive.perfdata.*.value&format=json"
  );
  const allData = await response;
  for (var i = 0; i < data; i++) {
    data.push({
      label: names[i],
      value: allData
    });
  }
  return data;
}

function getData() {
  let data = [];

  data.push({
    title: "Linux CPU",
    data: getRandomDateArray(150)
  });

  data.push({
    title: "Linux Network",
    data: getRandomArray(20)
  });

  data.push({
    title: "Categories",
    data: getRandomArray(10)
  });

  data.push({
    title: "Memory",
    data: getRandomArray(6)
  });

  return data;
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: getData()
    };
  }

  componentDidMount() {
    window.setInterval(() => {
      this.setState({
        data: getData()
      });
    }, 5000);
  }

  render() {
    return (
      <div className="App">
        <Host_Header />

        <div className="sub chart-wrapper">
          <NetworkGraph
            data={this.state.data[0].data}
            title={this.state.data[0].title}
            color=" #4E6E7D"
            fontFamily="Courier"
          />
        </div>
        <div className="sub chart-wrapper">
          <Memory
            data={this.state.data[3].data}
            title={this.state.data[3].title}
            colors={[
              "#c1432e",
              "#4b6777f5",
              "#ce9e62",
              "#2c2c2c7a",
              "#453748",
              "#edf1da"
            ]}
            fontFamily="Courier, monospace"
          />
        </div>

        <div className="sub chart-wrapper">
          <CPUGraph
            data={this.state.data[1].data}
            title={this.state.data[1].title}
            color={[
              "#c1432e",
              "#4b6777f5",
              "#ce9e62",
              "#453748",
              "#edf1da",
              "#c1432e",
              "#4b6777f5",
              "#ce9e62",
              "#453748",
              "#edf1da",
              "#c1432e",
              "#4b6777f5",
              "#ce9e62",
              "#453748",
              "#edf1da",
              "#c1432e",
              "#4b6777f5",
              "#ce9e62",
              "#453748",
              "#edf1da"
            ]}
            fontFamily="Courier, monospace"
          />
        </div>
        <Footer />
      </div>
    );
  }
}
export default App;
