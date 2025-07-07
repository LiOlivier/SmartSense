import React from "react";

function HumidityWidget() {
    const data = [
        { 
            valeur: 65, 
            timestamp: new Date().toISOString()
        }
    ];

    const last = data[0];

    let bgColor = "#e5f6ff";
    if (last && last.valeur > 50) {
        bgColor = "#ffe5e5"; 
    }

    return (
        <div style={{
        border: "1px solid #ccc",
        padding: "1rem",
        margin: "1rem",
        backgroundColor: bgColor
    }}>
      <h2>💧 Humidité</h2>
      {last ? (
        <>
          <p><strong>Valeur :</strong> {last.valeur} %</p>
          <p><strong>Heure :</strong> {new Date(last.timestamp).toLocaleTimeString()}</p>
            {last.valeur > 50 && <p style={{ color: "red" }}>⚠️ Humidité élevée !</p>}
        </>
      ) : (
        <p>Aucune donnée disponible</p>
      )}
    </div>
  );
}

export default HumidityWidget;