require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3001;
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => {
    console.log('🛢️ Connexion MongoDB réussie');
    app.listen(PORT, () => {
      console.log(`Serveur SmartSense lancé avec le port : ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erreur de connexion MongoDB :', err);
  });

const Data = require('./models/Data'); // adapte le chemin si besoin

app.get("/api/data", async (req, res) => {
  try {
    const allData = await Data.find().sort({ timestamp: -1 });
    res.json(allData);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.post("/api/data", async (req, res) => {
  try {
    const { capteur, type, valeur, timestamp } = req.body;
    const nouvelleMesure = new Data({ capteur, type, valeur, timestamp });
    await nouvelleMesure.save();
    res.status(201).json({ message: "Mesure enregistrée avec succès" });
  } catch (err) {
    console.error("Erreur POST :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});


