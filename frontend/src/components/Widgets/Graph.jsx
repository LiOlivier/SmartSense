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
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const filtered = data
    .filter(d => d.type === type && new Date(d.timestamp) >= oneDayAgo)
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  const hourlyData = new Map();

  filtered.forEach(d => {
    const date = new Date(d.timestamp);
    const hour = date.getHours().toString().padStart(2, "0") + ":00";
    hourlyData.set(hour, d.valeur);
  });

  const labels = Array.from(hourlyData.keys());
  const values = Array.from(hourlyData.values());

  return { labels, values };
};

const SingleLineChart = ({ label, color, data }) => {
  if (!data || data.values.length === 0) {
    return <p style={{ color: "white" }}>Pas de données pour {label}</p>;
  }

  let yMin = 0;
  let yMax = 2000;

  if (label.toLowerCase().includes("temp")) {
    yMin = 0;
    yMax = 40;
  } else if (label.toLowerCase().includes("hum")) {
    yMin = 0;
    yMax = 100;
  } else if (label.toLowerCase().includes("co₂") || label.toLowerCase().includes("co2")) {
    yMin = 400;
    yMax = 2000;
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
      x: { ticks: { color: "white" } },
      y: {
        ticks: { color: "white" },
        min: yMin,
        max: yMax
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
