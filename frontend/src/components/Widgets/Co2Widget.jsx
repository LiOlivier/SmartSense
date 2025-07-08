import React from "react";

function Co2Widget() {
  const data = [
    { 
      valeur: 600, 
      timestamp: new Date().toISOString()
    }
  ];
  const last = data[0];

  // Fonction pour déterminer le niveau
  const getCo2Level = (valeur) => {
    if (valeur > 1200) return "élevé";
    if (valeur >= 1000) return "moyen";
    return "ok";
  };

  const getBackgroundColor = (niveau) => {
    switch (niveau) {
      case "élevé":
        return "#ebaaaa"; // rouge clair
      case "moyen":
        return "#f3d4a8"; // jaune clair
      case "ok":
      default:
        return "#baf8b6"; // vert clair
    }
  };

  const niveau = getCo2Level(last.valeur);

  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "1rem",
      margin: "1rem",
      backgroundColor: getBackgroundColor(niveau)
    }}>
      <h2>🌬️ CO₂</h2>
      {last ? (
        <>
          <p><strong>Valeur :</strong> {last.valeur} ppm</p>
          <p><strong>Heure :</strong> {new Date(last.timestamp).toLocaleTimeString()}</p>
          {niveau === "élevé" && <p style={{ color: "red" }}>⚠️ Niveau élevé de CO₂ !</p>}
          {niveau === "moyen" && <p style={{ color: "orange" }}>⚠️ Niveau modéré de CO₂.</p>}
          {niveau === "ok" && <p style={{ color: "green" }}>✅ Niveau de CO₂ correct.</p>}
        </>
      ) : (
        <p>Aucune donnée disponible</p>
      )}
    </div>
  );
}

export default Co2Widget;
