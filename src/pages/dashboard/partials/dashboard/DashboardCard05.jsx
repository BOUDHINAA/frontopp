import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { VictoryPie } from 'victory';
import { Typography, ThemeProvider } from "@material-tailwind/react";

// Définir le thème personnalisé avec les couleurs spécifiées
const customTheme = {
  colors: {
    gray: {
      300: "#CBD5E0",
    },
    red: {
      600: "#DC2626", // Red 600
    },
    black: "#000000",
  },
};

function DashboardCard05() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          throw new Error("Access token not found");
        }

        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };

        const response = await axios.get("http://localhost:3000/user", config);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  if (users.length === 0) {
    return <div>Loading...</div>;
  }

  const roleDistribution = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {});

  const roleDistributionData = Object.keys(roleDistribution).map(role => ({
    x: role,
    y: roleDistribution[role]
  }));
  return (
    <ThemeProvider theme={customTheme}>
      <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
        <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3 ml-auto mr-auto mt-20 text-center"> {/* Centrer le contenu */}
         
         
         
          <Typography variant="h3" color="red-600" className="mb-1"> {/* Utiliser Red 600 et une taille de titre plus grande */}
            User Role Distribution
          </Typography>
          <VictoryPie  
          className='ml-80 mr-80 mb-10'
            data={roleDistributionData} 
            colorScale={["#DC2626", "#000000", "#CBD5E0"]} 
            width={1300} // Ajuster la largeur du graphique
            height={700} // Ajuster la hauteur du graphique
            style={{
              labels: { // Style des titres de graphique
                fill: "#000000", // Couleur de texte
                fontSize: 70, // Taille de police
                fontWeight: "bold", // Poids de la police
              }
            }}
          />
        </div>
      </div>
    </ThemeProvider>
  );
  
  
  
  
}

export default DashboardCard05;
