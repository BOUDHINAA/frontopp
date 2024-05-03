import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Progress,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaUserLock } from "react-icons/fa";
import { UserIcon } from "@heroicons/react/24/solid";
import { EyeIcon } from "@heroicons/react/24/solid";
import { ToastContainer, toast } from "react-toastify";
import { VictoryPie, VictoryChart } from "victory";
import { tailwindConfig } from "../../components/utils/Utils";

function DashboardCard04() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [jobOffers, setJobOffers] = useState([]);
  const [locationDistributionData, setLocationDistributionData] = useState([]);

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

  const totalUsers = users.length;
  const activeUsers = users.filter((user) => !user.isBlocked).length;
  const blockedUsers = users.filter((user) => user.isBlocked).length;
  
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
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-200">
           STATICTICS
        </h2>
      </header>
      <CardBody>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <Typography color="gray-600">Total Users</Typography>
            <Typography color="gray-600">{totalUsers}</Typography>
          </div>
          <hr className="border-gray-300 dark:border-red-700" />
          <div className="flex items-center justify-between">
            <Typography color="red-700">Active Users</Typography>
            <Typography color="red-700">{activeUsers}</Typography>
          </div>
          <hr className="border-gray-300 dark:border-red-700" />
          <div className="flex items-center justify-between">
            <Typography color="blue-600">Blocked Users</Typography>
            <Typography color="blue-600">{blockedUsers}</Typography>
          </div>
          <hr className="border-gray-300 dark:border-red-700" />

          <div className="flex items-center justify-between">
            <Typography color="black-600"> Total Job Offers</Typography>
            <Typography color="blue-600">{jobOffers.length}</Typography>
          </div>
       



        </div>
      </CardBody>
    </div>
  );
  
}

export default DashboardCard04;