//importation de express pour la création de routes
const express = require("express");
//création d'un mini routeur express
const router = express.Router();

// importation de la fonction enregistrerDonnee() dans dataController.js -> enregistrement de donnée dans MongoDB
const{enregistrerDonnee} = require("../controllers/dataController");

//si une requête POST est envoyé /api/data ça exécute enregistrerDonnee()
router.post("/", enregistrerDonnee);

//exportation du routeur pour l'utiliser dans le fichier principal
module.exports = router;
