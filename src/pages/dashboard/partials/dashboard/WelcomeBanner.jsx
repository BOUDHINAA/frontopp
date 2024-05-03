import React, { useEffect, useState } from 'react';
import axios from 'axios';

function WelcomeBanner() {
  const [greeting, setGreeting] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Obtenir l'heure actuelle et définir la salutation appropriée
    const currentHour = new Date().getHours();
    let greetingMessage;

    if (currentHour >= 5 && currentHour < 12) {
      greetingMessage = 'Good morning';
    } else if (currentHour >= 12 && currentHour < 17) {
      greetingMessage = 'Good afternoon';
    } else if (currentHour >= 17 && currentHour < 21) {
      greetingMessage = 'Good evening';
    } else {
      greetingMessage = 'Good night';
    }

    setGreeting(greetingMessage);

   const fetchUserName = async () => {
      try {
        // Récupérer le jeton d'accès depuis le stockage local
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          throw new Error("Access token not found"); // Gérer le cas où le jeton n'est pas disponible
        }
    
        // Configuration des en-têtes pour inclure le jeton d'accès
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Ajoutez le jeton dans l'en-tête
          },
        };
        // Effectuer la requête avec les en-têtes d'authentification
        const response = await axios.get('/user/getUserName', config); // Utiliser le chemin correct
    
        // Mettre à jour l'état avec le nom de l'utilisateur
        setUserName(response.data.userName);
      } catch (error) {
        if (error.message === "Access token not found") {
          // Gérer l'absence de jeton d'accès (par exemple, rediriger vers la connexion)
          console.error("No access token found, redirecting to login...");
          // Logique de redirection ou autre gestion d'erreur
        } else {
          console.error("Error fetching user name:", error);
        }
      }
    };

    fetchUserName();// N'oubliez pas d'appeler la fonction

  }, []); // Utilisation de useEffect pour exécuter le code lors du montage du composant

  // Rendu du composant
  return (
    <div className="relative bg-gray-300 dark:bg-indigo-500 p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
      {/* Contenu */}
      <div className="relative">
        <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold mb-1">
          {greeting},         {userName}
  👋
        </h1>
        <p className="dark:text-indigo-200">This is your DASHBOARD :</p>
      </div>
    </div>
  );
}

export default WelcomeBanner;
