import React from "react";

function Co2Widget() {
  const data = [
    { 
        valeur: 600, 
        timestamp: new Date().toISOString()
    }
  ];
  const last = data[0];

  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "1rem",
      margin: "1rem",
      backgroundColor: last?.valeur > 1000 ? "#ffe5e5" : "#e5ffe5"
    }}>
        <h2>🌬️ CO₂</h2>
        {last ? (
        <>
            <p><strong>Valeur :</strong> {last.valeur} ppm</p>
            <p><strong>Heure :</strong> {new Date(last.timestamp).toLocaleTimeString()}</p>
            {last.valeur > 1200 && <p style={{ color: "red" }}>⚠️ Niveau élevé de CO₂ !</p>}
        </>
        ) : (
            <p>Aucune donnée disponible</p>
        )}
    </div>
  );
}

export default Co2Widget;