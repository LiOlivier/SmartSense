//importation de express pour la création de routes
const express = require("express");
//création d'un mini routeur express
const router = express.Router();

//variable Data reprenantla base de données MongoDB (notre structure)
const Data = require('../models/Data');


router.get("/", async (req, res) =>
{
    try
    {
        //récupération de toutes les données de la base de données MongoDB
        const allData = await Data.find().sort({ timestamp: -1 });
        //envoi des données au frontend
        res.json(allData);
    } catch (err) {
        //en cas d'erreur, on envoie un message d'erreur
        res.status(500).json({ error: "Erreur serveur" });
    }
});

router.post("/", async (req, res) =>
{
    try 
    {
        const nouvelleMesure = new Data(req.bodyque );
        await nouvelleMesure.save();
        res.status(201).json({ message: "Mesure enregistrée avec succès" });
    }
    catch (err)
    {
        console.error("Erreur POST :", err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

// Exportation du routeur pour l'utiliser dans le fichier server.js
module.exports = router;
