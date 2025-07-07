const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

//L'objectif ici est de simuler l'envoi de données à notre API
// pour tester le frontend sans avoir de capteurs physiques.
// On va envoyer des données toutes les 3 secondes.

setInterval(() => {
  const fakeData = {
    capteur: "Capteur - 1",
    type: "CO₂",
    valeur: Math.floor(Math.random() * 2000), 
    timestamp: new Date().toISOString()
  };

  fetch("http://localhost:3001/api/data", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fakeData)
  })
    .then(res => res.json())
    .then(res => console.log("Donnée envoyée :", fakeData))
    .catch(err => console.error(" Erreur simulateur :", err));
}, 60000);


