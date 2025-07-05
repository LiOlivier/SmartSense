export async function fetchData()
{
  const response = await fetch('http://localhost:3001/api/data'); 
  if (!response.ok) throw new Error('Erreur lors du fetch');
  return response.json(); // Récupère les données au format JSON
}

//en gros, on utilise fetch pour récupérer les données via le lien et 
//transorme la réponse en objet JSON
//on utilise async/await por gérer les promesses de manière asynchrone 

export async function postData(data)
{
  const response = await fetch('http://localhost:3001/api/data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Erreur lors du POST');
  return response.json();
}
