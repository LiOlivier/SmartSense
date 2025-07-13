import React from "react";
import { Line } from "react-chartjs-2";
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
  const start = new Date(now.getTime() - 60 * 60 * 1000); // dernière heure
  const labels = [];

  // ➕ Ajoute les 60 dernières minutes
  for (let i = 0; i <= 60; i++) {
    const t = new Date(start.getTime() + i * 60 * 1000);
    const label = t.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    labels.push(label);
  }

  const minuteMap = {};
  data
    .filter(d => d.type === type)
    .forEach(d => {
      const minute = new Date(d.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      minuteMap[minute] = d.valeur;
    });

  console.log("Graph →", type, minuteMap);

  const values = labels.map(label => minuteMap[label] !== undefined ? minuteMap[label] : null);

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

const Graph = ({ data }) => {
  const tempData = processGraphData(data, "température");
  const co2Data = processGraphData(data, "co2");
  const humiData = processGraphData(data, "humidité");

  return (
    <div className="stacked-graphs">
      <SingleLineChart label="🌡️ Température (°C)" color="#90caf9" data={tempData} />
      <SingleLineChart label="🌬️ CO₂ (ppm)" color="#f7b267" data={co2Data} />
      <SingleLineChart label="💧 Humidité (%)" color="#b39ddb" data={humiData} />
    </div>
  );
};

export default Graph;
