// Dashboard.jsx
import React, { useEffect, useState } from "react";
import Co2Widget from "../Widgets/Co2Widget";
import HumidityWidget from "../Widgets/HumidityWidget";
import TemperatureWidget from "../Widgets/TemperatureWidget";
import Donut from "../Widgets/Donut"; 
import "./Dashboard.css";
import { getData } from "../services/api"; // Chemin corrigé

function Dashboard() {

  const [donnees, setDonnees] = useState([]);
  const sampleData = [
    { label: "Sun", value: 35910 },
    { label: "Mon", value: 25190 },
    { label: "Tue", value: 23980 },
    { label: "Wed", value: 21340 },
    { label: "Thu", value: 22130 },
    { label: "Fri", value: 23130 },
    { label: "Sat", value: 25500 }
  ];

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

        <div style={{ marginTop: "2rem" }}>
        <Donut data={sampleData} />
      </div>
      
    </div>

  );
}

export default Dashboard;


