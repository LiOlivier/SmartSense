const Data = require("../models/Data");


//création de fonction asynchrone -> opération longue donc usage de save() en bd
// req = requête envoyée par le client ---------- res = requête reçu par le client
const enregistrementDonnee = async(req, res) => {
    try
    {
        const{capteur, type, valeur} = req.body
        const nouvelleDonnee = new Data({ capteur, type, valeur });
        await nouvelleDonnee.save();

        res.status(201).json({ message: "Donnée enregistrée ✅" });
    }
    catch(err)
    {
        console.error(err);
        res.status(500).json({ error: "Erreur lors de l'enregistrement ❌" });
    }
};

module.exports = { enregistrerDonnee };