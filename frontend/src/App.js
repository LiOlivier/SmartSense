import React, { useEffect, useState } from "react";

function App() {
    const [donnees, setDonnees] = useState([]);
    const [filtre, setFiltre] = useState(""); // "" = tous

    // récupération des données depuis l'API
    useEffect(() => { 
        fetch("http://localhost:3001/api/data") //URL de l'API qui affichera les données
            .then((res) => res.json())
            .then((data) => {
                console.log("Données reçues:", data);  //Valider
                setDonnees(data);
            })
            .catch((err) => console.error("Erreur API :", err)); //Erreur
    }, []);


    return (
        <div style={{ padding: "2rem", fontFamily: "Arial" }}>
            <h1>📊 Dashboard SmartSense</h1>

            {/* filtre pour choisir le type de données */}
            <label>Filtrer par type de mesure : </label>
            <select onChange={(e) => setFiltre(e.target.value)} value={filtre}>
                <option value="">Afficher tout</option>
                <option value="co2">CO₂</option>
                <option value="température">Température</option>
                <option value="humidité">Humidité</option>
            </select>

            <br /><br />

            {/* tableau */}
            <table border="2" cellPadding="15" style={{ borderCollapse: "collapse" }}>
                <thead>
                <tr>
                    <th>Capteur</th>
                    <th>Type</th>
                    <th>Valeur</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {donnees
                    .filter(item => filtre === "" || item.type === filtre)
                    .map((item, index) => (
                    <tr key={index}>
                        <td>{item.capteur}</td>
                        <td>{item.type}</td>
                        <td>{item.valeur}</td>
                        <td>{new Date(item.timestamp).toLocaleString()}</td>
                    </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}

export default App;
