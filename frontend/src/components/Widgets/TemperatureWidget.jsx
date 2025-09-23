import React from "react";

function TemperatureWidget() {
  const data = [
    { 
        valeur: 28.5, 
        timestamp: new Date().toISOString()
    }
  ];

  const last = data[0];

    return (
        <div style={{
        border: "1px",
        padding: "1rem",
        margin: "1rem",
      }}>
        <h2>Température</h2>
        {last ? (
            <>
            <p>{last.valeur} °C</p>
            <p><strong>Heure :</strong> {new Date(last.timestamp).toLocaleTimeString()}</p>
                {last.valeur > 31 && <p style={{ color: "red" }}> Température élevée !</p>}
                {last.valeur < 15 && <p style={{ color: "orange" }}> Température trop basse !</p>}
                {last.valeur >= 15 && last.valeur <= 31 && <p style={{ color: "green" }}>Température correcte.</p>} 
            </>
        ) : (
        <p>Aucune donnée disponible</p>
        )}
    </div>
  );
}

export default TemperatureWidget;