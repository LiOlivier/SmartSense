const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

//L'objectif ici est de simuler l'envoi de données à notre API
// pour tester le frontend sans avoir de capteurs physiques.
// On va envoyer des données toutes les 3 secondes.

const types = ["co2", "température", "humidité"];

setInterval(() => {
  const type = types[Math.floor(Math.random() * types.length)];

  const fakeData = {
    capteur: "Capteur - 1",
    type,
    valeur: Math.floor(Math.random() * 2000),
    timestamp: new Date().toISOString()
  };

  console.log("▶️ Donnée simulée :", fakeData);

  fetch("http://localhost:3001/api/data", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fakeData)
  })
    .then(res => res.json())
    .then(() => console.log("Donnée envoyée"))
    .catch(err => console.error("Erreur simulateur :", err));
}, 3000);

