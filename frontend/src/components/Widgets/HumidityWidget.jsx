import React from "react";

function HumidityWidget() {
    const data = [
        { 
            valeur: 35, 
            timestamp: new Date().toISOString()
        },
        { 
            valeur: 65, 
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
      <h2> Humidité</h2>
      {last ? (
        <>
          <p>{last.valeur} %</p>
          <p><strong>Heure :</strong> {new Date(last.timestamp).toLocaleTimeString()}</p>
            {last.valeur < 30 && (
              <p style={{ color: "orange"}}>Humidité trop basse !</p>
            )}
            {last.valeur > 50 && (
              <p style={{ color: "red" }}>Humidité élevée !</p>
            )}
            {last.valeur >= 30 && last.valeur <= 50 && (
              <p style={{ color: "green" }}>Humidité correcte.</p>
            )}
            </>
          ) : (      
        <p>Aucune donnée disponible</p>
      )}
    </div>
  );
}

export default HumidityWidget;