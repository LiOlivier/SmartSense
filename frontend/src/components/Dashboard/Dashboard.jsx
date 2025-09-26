import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import Co2Widget from "../Widgets/Co2Widget";
import HumidityWidget from "../Widgets/HumidityWidget";
import TemperatureWidget from "../Widgets/TemperatureWidget";
import LineChart from "../Widgets/Graph";
import { getData } from "../services/api";
import "./Dashboard.css";

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
    <div className="dashboard-layout">
      <div className="sidebar">
        <Sidebar />
      </div>

      <div className="widgets">
        {/* <p>Données Capteurs</p> */}
        <TemperatureWidget data={donnees.filter(d => d.type === "température")} />
        <HumidityWidget data={donnees.filter(d => d.type === "humidité")} />
        <Co2Widget data={donnees.filter(d => d.type === "co2")} />
      </div>

    <div className="graph-section">
      <LineChart data={donnees} type="température" />
      <LineChart data={donnees} type="humidité" />
      <LineChart data={donnees} type="co2" />
    </div>

      <div className="summary-section">
        <h3>Résumé</h3>
      </div>
    </div>
  );
}

export default Dashboard;
