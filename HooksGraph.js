import React, { useEffect, useState } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import Axios from "axios";

//this is an attempt to grab the API data with Hooks

const HooksGraph = () => {
  const [chartData, setChartData] = useState({});
  const [targetData, setTargetData] = useState([]);
  const [dataPoints, setDataPoints] = useState([]);

  const chart = () => {
    let targDat = [];
    let datPnt = [];

    //an attempt to get any data from the API
    //used about 100 different variants to the below url...
    Axios.get(
      "http://18.236.126.230/render?target=icinga2.logic-test-0*.host.hostalive.perfdata.*.value&from=-1d&format=json"
    )
      .then(res => {
        for (const dataObj of res.data) {
          targDat.push(dataObj.target_data);
          datPnt.push(dataObj.data_point);
        }
        setChartData({
          labels: datPnt,
          datasets: [
            {
              label: "Hooks Graph",

              //this needs to be an array of things that I grab from the api call somehow
              data: targDat,
              backgroundColor: ["white"],
              borderWidth: 2
            }
          ]
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    chart();
  }, []);

  return (
    <div style={{ height: "500px", width: "500px" }}>
      <Line
        data={chartData}
        options={{
          responsive: true,
          title: { text: "I Am Testing Grabbbing The Data via Hooks", display: true },
          scales: {
            yAxes: [
              {
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 15,
                  beginAtZero: true
                },
                gridLines: {
                  display: true
                }
              }
            ],
            xAxes: [
              {
                gridLines: {
                  display: true
                }
              }
            ]
          }
        }}
      />
    </div>
  );
};

export default HooksGraph;
