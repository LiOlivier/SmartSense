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

rouget.post("/", async (req, res) =>
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











// importation de la fonction enregistrerDonnee() dans dataController.js -> enregistrement de donnée dans MongoDB
const{enregistrerDonnee} = require("../controllers/dataController");

//si une requête POST est envoyé /api/data ça exécute enregistrerDonnee()
router.post("/", enregistrerDonnee);

//exportation du routeur pour l'utiliser dans le fichier principal
module.exports = router;
