import React, { useState, useEffect } from 'react';
import { VictoryPie } from 'victory';
import { Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";
import axios from 'axios'; // Importez Axios pour effectuer des requêtes HTTP
import DoughnutChart from '../charts/DoughnutChart'; // Assurez-vous que le chemin est correct

function DashboardCard06() {
  const [jobOffers, setJobOffers] = useState([]);
  const [locationDistributionData, setLocationDistributionData] = useState([]);

  useEffect(() => {
    const fetchJobOffers = async () => {
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
        const response = await axios.get("http://localhost:3000/job_offer/getall", config);
        setJobOffers(response.data);
      } catch (error) {
        console.error("Error fetching job offers:", error);
      }
    };
    fetchJobOffers();
  }, []);

  useEffect(() => {
    const locationDistribution = jobOffers.reduce((acc, offer) => {
      acc[offer.lieu] = (acc[offer.lieu] || 0) + 1;
      return acc;
    }, {});
    const data = Object.keys(locationDistribution).map(location => ({
      x: location,
      y: locationDistribution[location]
    }));
    setLocationDistributionData(data);
  }, [jobOffers]);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-300">OFFERS Distribution by Location
</h2>
      </header>
      <div className="mt-2 mb-40">
              
    
<VictoryPie data={locationDistributionData} height={200} />

      </div>



    </div>
  );
}

export default DashboardCard06;
