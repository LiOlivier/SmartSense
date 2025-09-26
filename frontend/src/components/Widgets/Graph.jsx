import React from "react";
import { Line } from "react-chartjs-2";
import GraphCarousel from "./GraphCarousel";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const processGraphData = (data, type) => {
  const now = new Date();
  const start = new Date(now.getTime() - 60 * 60 * 1000); 
  const labels = [];

  const formatMinute = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  for (let i = 0; i <= 60; i++) {
    const t = new Date(start.getTime() + i * 60 * 1000);
    labels.push(formatMinute(t));   
  }

  const minuteMap = {};
  data
    .filter(d => d.type === type)
    .forEach(d => {
      const minute = formatMinute(d.timestamp);  
      minuteMap[minute] = d.valeur;
    });

  console.log("Graph →", type, minuteMap);

  const values = labels.map(label => 
    minuteMap.hasOwnProperty(label) ? minuteMap[label] : null
  );

  return { labels, values };
};

const SingleLineChart = ({ label, color, data }) => {
  if (!data || data.values.length === 0) {
    return <p style={{ color: "white" }}>Pas de données pour {label}</p>;
  }

  let yMin = 0, yMax = 2000;

  if(label.toLowerCase().includes("temp"))
  {
    yMin = 0; yMax = 50;
  } 
  else if (label.toLowerCase().includes("hum"))
  {
    yMin = 0; yMax = 100;
  } 
  else if (label.toLowerCase().includes("co₂") || label.toLowerCase().includes("co2"))
  {
    yMin = 400; yMax = 2000;
  }

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label,
        data: data.values,
        borderColor: color,
        backgroundColor: color,
        tension: 0.3,
        spanGaps: false,
        pointRadius: 0,
        pointHoverRadius: 6
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: "white" }
      }
    },
    scales: {
      x: {
        ticks: { color: "white" }
      },
      y: {
        ticks: { color: "white" },
        min: yMin,
        max: yMax,
        beginAtZero: false
      }
    }
    };

  return (
    <div className="graph-container">
      <h3 style={{ color: "white", marginBottom: "0.5rem" }}>{label}</h3>
      <Line data={chartData} options={options} />
    </div>
  );
};


const Graph = ({ data, type }) => {
  const graphData = processGraphData(data, type);

  let label = "";
  let color = "";

  if (type === "température") {
    label = " Température (°C)";
    color = "#90caf9";
  } else if (type === "co2") {
    label = " CO₂ (ppm)";
    color = "#f7b267";
  } else if (type === "humidité") {
    label = "Humidité (%)";
    color = "#b39ddb";
  } 

  return <SingleLineChart label={label} color={color} data={graphData} />;
};

export default Graph;