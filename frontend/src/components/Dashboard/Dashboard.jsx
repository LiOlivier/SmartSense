import React, { useState, useEffect } from 'react';
import { fetchData, postData } from './services/api'; // tes fonctions API
import './Dashboard.css'; 
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
  rel="stylesheet"
/>

function Dashboard() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    capteur: '',
    type: 'co2',
    valeur: '',
    timestamp: new Date().toISOString(),
  });

  // Charger les données au montage du composant
  useEffect(() => {
    fetchData()
      .then(setData)
      .catch(console.error);
  }, []);

  // Gestion de la saisie dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Envoi du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postData(form);
      alert('Donnée ajoutée avec succès !');
      // Recharger les données après ajout
      const updatedData = await fetchData();
      setData(updatedData);
      // Réinitialiser le formulaire
      setForm({
        capteur: '',
        type: 'co2',
        valeur: '',
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      alert('Erreur lors de l\'ajout.');
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Dashboard SmartSense</h1>

      {/* Formulaire d’ajout */}
      <form onSubmit={handleSubmit}>
        <input
          name="capteur"
          value={form.capteur}
          onChange={handleChange}
          placeholder="Nom du capteur"
          required
        />
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="co2">CO₂</option>
          <option value="température">Température</option>
          <option value="humidité">Humidité</option>
        </select>
        <input
          name="valeur"
          type="number"
          value={form.valeur}
          onChange={handleChange}
          placeholder="Valeur"
          required
        />
        <button type="submit">Envoyer</button>
      </form>

      {/* Tableau des données */}
      <table border="1" cellPadding="5" style={{ marginTop: '20px' }}>
        <thead>
          <tr>
            <th>Capteur</th>
            <th>Type</th>
            <th>Valeur</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i}>
              <td>{item.capteur}</td>
              <td>{item.type}</td>
              <td>{item.valeur}</td>
              <td>{new Date(item.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
