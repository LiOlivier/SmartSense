
// importe Moogoose, pour interagir facillement entre MongoDB et Node.js
const mongoose = require("mongoose");

// création de schéma de données pour l'objet que nous allons enregistrer
const dataSchema = new mongoose.Schema({
    capteur: { type: String, required: true },
    type: { type: String, required: true },
    valeur: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
});

//création et exportation du modèle appeler Data, modèle qu'on utilise dans dataController
module.exports = mongoose.model("Data", dataSchema);