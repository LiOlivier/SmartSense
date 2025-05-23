# SmartSense

## Description
SmartSense est une application IoT full-stack permettant de collecter, stocker et visualiser en temps réel des données de capteurs (CO₂, température, humidité).  
Le backend, écrit en Node.js/Express, expose une API REST et persiste les mesures dans MongoDB. Le frontend, développé en React, affiche un tableau interactif avec filtres et alertes.

## Fonctionnalités clés
- **API REST** (POST/GET) pour l’envoi et la récupération de mesures  
- **MongoDB** (base `smartsense`, collection `datas`) pour le stockage persistant  
- **Dashboard React** :  
  - Tri et filtrage dynamique par type de mesure  
  - Affichage en temps réel des dernières valeurs  
  - Système d’alertes visuelles pour seuils critiques (ex. CO₂ > 1000 ppm)  
- **Simulateur HTML/JS** pour tester manuellement l’API  
