// Graph.jsx
import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

const groupByTimeSlot = (data, slotMinutes = 10) => {
  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

  const grouped = {};

  data.forEach(d => {
    const time = new Date(d.timestamp);
    if (time >= oneHourAgo) {
      const slot = new Date(Math.floor(time.getTime() / (slotMinutes * 60 * 1000)) * (slotMinutes * 60 * 1000));
      const key = slot.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      if (!grouped[key]) {
        grouped[key] = { co2: [], température: [], humidité: [] };
      }

      if (grouped[key][d.type.toLowerCase()]) {
        grouped[key][d.type.toLowerCase()].push(d.valeur);
      }
    }
  });

  const labels = Object.keys(grouped).sort();
  const result = {
    labels,
    co2: [],
    température: [],
    humidité: []
  };

  labels.forEach(label => {
    const slot = grouped[label];
    ["co2", "température", "humidité"].forEach(type => {
      const values = slot[type];
      const avg = values.length ? values.reduce((a, b) => a + b, 0) / values.length : null;
      result[type].push(avg);
    });
  });

  return result;
};

const Graph = ({ data }) => {
  const groupedData = groupByTimeSlot(data);

  const chartData = {
    labels: groupedData.labels,
    datasets: [
      {
        label: "CO₂ (ppm)",
        data: groupedData.co2,
        borderColor: "#f7b267",
        backgroundColor: "#f7b267",
        tension: 0.4
      },
      {
        label: "Température (°C)",
        data: groupedData.température,
        borderColor: "#90caf9",
        backgroundColor: "#90caf9",
        tension: 0.4
      },
      {
        label: "Humidité (%)",
        data: groupedData.humidité,
        borderColor: "#b39ddb",
        backgroundColor: "#b39ddb",
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "white"
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: "white"
        }
      },
      y: {
        ticks: {
          color: "white"
        },
        beginAtZero: true
      }
    }
  };

  return (
    <div style={{ width: "90%", margin: "2rem auto" }}>
      <h2 style={{ textAlign: "center" }}>📈 Moyennes toutes les heures</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default Graph;
