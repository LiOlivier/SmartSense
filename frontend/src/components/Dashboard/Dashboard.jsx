// Dashboard.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import Co2Widget from "../Widgets/Co2Widget";
import HumidityWidget from "../Widgets/HumidityWidget";
import TemperatureWidget from "../Widgets/TemperatureWidget";
import LineChart from "../Widgets/Graph";
import Donut from "../Widgets/Donut";
import "./Dashboard.css";
import { getData } from "../services/api";

function Dashboard() {
  const [donnees, setDonnees] = useState([]);

  const getDonutData = (donnees) => {
    const countByType = {};
    donnees.forEach(d => {
      const type = d.type;
      countByType[type] = (countByType[type] || 0) + 1;
    });
    return Object.entries(countByType).map(([label, value]) => ({ label, value }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        setDonnees(data);
      } catch (error) {
        console.error("Erreur de récupération des données :", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: "flex" }}>
    <Sidebar />

      <h1>Dashboard SmartSense</h1>

      <div className="widgets">
        <TemperatureWidget data={donnees.filter(d => d.type === "température")} />
        <HumidityWidget data={donnees.filter(d => d.type === "humidité")} />
        <Co2Widget data={donnees.filter(d => d.type === "co2")} />
      </div>

      <div className="dashboard-bottom">
        <div className="graph-section">
          <LineChart data={donnees} />
        </div>
        <div className="summary-section">
          <h3>Résumé</h3>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
