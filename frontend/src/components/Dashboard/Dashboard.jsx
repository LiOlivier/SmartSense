// Dashboard.jsx
import React, { useEffect, useState } from "react";
import Co2Widget from "../Widgets/Co2Widget";
import HumidityWidget from "../Widgets/HumidityWidget";
import TemperatureWidget from "../Widgets/TemperatureWidget";
import "./Dashboard.css";
import { getData } from "../../services/api";

function Dashboard() {
  const [donnees, setDonnees] = useState([]);

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
    <div className="dashboard-container">
      <h1>📊 Dashboard SmartSense</h1>
      <div className="widgets">
        <Co2Widget data={donnees.filter(d => d.type === "co2")} />
        <TemperatureWidget data={donnees.filter(d => d.type === "température")} />
        <HumidityWidget data={donnees.filter(d => d.type === "humidité")} />
      </div>
    </div>
  );
}

export default Dashboard;
