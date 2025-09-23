import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <img src="/svg/logo.svg" alt="SmartSense" className="logo" />
      </div>

      <div className="sidebar-separator"></div>

      <div className="sidebar-bottom">
        <img src="/svg/menu.svg" alt="Capteurs" className="nav-icon" />
        <img src="/svg/meteo.svg" alt="Météo" className="nav-icon" />
        <img src="/svg/map.svg" alt="Carte" className="nav-icon" />
        <img src="/svg/settings.svg" alt="Paramètres" className="nav-icon" />
      </div>
    </div>
  );
};

export default Sidebar;
