import React from "react";

function TemperatureWidget() {
  const data = [
    { 
        valeur: 28.5, 
        timestamp: new Date().toISOString()
    }
  ];

  const last = data[0];

  let bgColor = "#e5f6ff";
  if (last && last.valeur > 31)
  {
    bgColor = "#ffe5e5"; 
  }
  else if (last && last.valeur < 15)
  {
    bgColor = "#fff5e5"; 
  }
  else if (last && last.valeur >= 15 && last.valeur <= 31)
  {
    bgColor = "#e5ffe5";  
  }
  
    return (
        <div style={{
        border: "1px solid #ccc",
        padding: "1rem",
        margin: "1rem",
        backgroundColor: bgColor    }}>
        <h2>🌡️ Température</h2>
        {last ? (
            <>
            <p><strong>Valeur :</strong> {last.valeur} °C</p>
            <p><strong>Heure :</strong> {new Date(last.timestamp).toLocaleTimeString()}</p>
                {last.valeur > 31 && <p style={{ color: "red" }}>⚠️ Température élevée !</p>}
                {last.valeur < 15 && <p style={{ color: "orange" }}>⚠️ Température trop basse !</p>}
                {last.valeur >= 15 && last.valeur <= 31 && <p style={{ color: "green" }}>✅ Température correcte.</p>} 
            </>
        ) : (
        <p>Aucune donnée disponible</p>
        )}
    </div>
  );
}

export default TemperatureWidget;