
// importe Moogoose, pour interagir facillement entre MongoDB et Node.js
const mongoose = require("mongoose");

// création de schéma de données pour l'objet que nous allons enregistrer
const dataSchema = new mongoose.Schema({
  capteur: String,
  type: String,
  valeur: Number,
  timestamp: Date
});


//création et exportation du modèle appeler Data, modèle qu'on utilise dans dataController
module.exports = mongoose.model("Data", dataSchema);
