import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">🌡️</div>
      <nav className="nav-icons">
        <div className="nav-item">📊</div> {/* Capteurs */}
        <div className="nav-item">🌤️</div> {/* Météo */}
        {/* Ajoute plus d’icônes ici */}
      </nav>
    </div>
  );
};

export default Sidebar;
