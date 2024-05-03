import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Tooltip } from "recharts";

export function Appap() {
  const [jobOffersData, setJobOffersData] = useState([]);
  const COLORS = ["#8A2BE2", "#00C49F", "#FFBB28", "#FF8042","#CD5C5C","#F4A460"]; // Color array for segments

  useEffect(() => {
    const fetchJobOffersData = async () => {
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
  ////samar aprés modification
        const response = await axios.get('/job_offer/company/joboffers', config);
        const jobOffers = response.data;

        // Count the number of job offers for each title
        const titleCounts = {};
        jobOffers.forEach((offer) => {
          if (titleCounts[offer.title]) {
            titleCounts[offer.title]++;
          } else {
            titleCounts[offer.title] = 1;
          }
        });

        // Calculate total number of job offers
        const totalOffers = Object.values(titleCounts).reduce((acc, curr) => acc + curr, 0);

        // Convert title counts to data array for PieChart
        const data = Object.keys(titleCounts).map((title, index) => ({
          name: title,
          users: titleCounts[title],
          percentage: ((titleCounts[title] / totalOffers) * 100).toFixed(2), // Calculate percentage
          fill: COLORS[index % COLORS.length], // Assign color based on index
        }));

        setJobOffersData(data);
      } catch (error) {
        console.error("Failed to fetch job offers:", error.response.data);
      }
    };

    fetchJobOffersData();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
<div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '-48px', paddingBottom: '0px' }} >Job Offers by Title</div>
      <div className="App">
        <PieChart width={800} height={800}>
          <Pie
            dataKey="users"
            isAnimationActive={false}
            data={jobOffersData}
            cx={400}
            cy={400}
            outerRadius={150}
            label={(entry) => `${entry.name} (${entry.percentage}%)`} // Custom label to display title and percentage
          />
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
}

export default Appap;



{/*
import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Tooltip } from "recharts";

export function Appap() {
  const [jobOffersData, setJobOffersData] = useState([]);
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]; // Tableau de couleurs pour les segments

  useEffect(() => {
    const fetchJobOffersData = async () => {
      try {
        const response = await axios.get("/job_offer/getall");
        const jobOffers = response.data;

        // Count the number of job offers for each title
        const titleCounts = {};
        jobOffers.forEach((offer) => {
          if (titleCounts[offer.title]) {
            titleCounts[offer.title]++;
          } else {
            titleCounts[offer.title] = 1;
          }
        });

        // Convert title counts to data array for PieChart
        const data = Object.keys(titleCounts).map((title, index) => ({
          name: title,
          users: titleCounts[title],
          fill: COLORS[index % COLORS.length], // Attribution de la couleur en fonction de l'index
        }));

        setJobOffersData(data);
      } catch (error) {
        console.error("Failed to fetch job offers:", error.response.data);
      }
    };

    fetchJobOffersData();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Job Offers by Title</h1>
      <div className="App">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="users"
            isAnimationActive={false}
            data={jobOffersData}
            cx={200}
            cy={200}
            outerRadius={80}
            label
          />
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
}

export default Appap;


*/}