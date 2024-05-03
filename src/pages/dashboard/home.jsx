import Sidebar from './partials/Sidebar';
import Header from './partials/Header';
import WelcomeBanner from './partials/dashboard/WelcomeBanner';
import DashboardAvatars from './partials/dashboard/DashboardAvatars';
import FilterButton from './components/DropdownFilter';
import Datepicker from './components/Datepicker';
import DashboardCard01 from './partials/dashboard/DashboardCard01'
import DashboardCard02 from './partials/dashboard/DashboardCard02';
import DashboardCard03 from './partials/dashboard/DashboardCard03';
import DashboardCard04 from './partials/dashboard/DashboardCard04';
import DashboardCard05 from './partials/dashboard/DashboardCard05';
import DashboardCard06 from './partials/dashboard/DashboardCard06';
import DashboardCard09 from './partials/dashboard/DashboardCard09';
import Banner from './partials/Banner';

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function HomeDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [jobOffers, setJobOffers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  
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
    const fetchNotifications = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          throw new Error('Access token not found'); // Check for the token
        }

        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Ensure correct token handling
          },
        };

        const response = await axios.get('http://localhost:3000/user/admin', config); // Correct endpoint
        setNotifications(response.data); // Set the state with retrieved notifications
      } catch (error) {
        console.error('Error fetching notifications:', error);

        // Redirect if the token is invalid
        if (error.message === 'Access token not found') {
          navigate('/login'); // Redirect to login page
        }
      }
    };

    fetchNotifications(); // Trigger fetch upon mounting
  }, []);

  const filteredJobOffers = jobOffers.filter((offer) => {
    const { title, description, qualifications, responsibilities, lieu, langue } = offer;
    if (searchTerm) {
      return (
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        qualifications.toLowerCase().includes(searchTerm.toLowerCase()) ||
        responsibilities.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lieu.toLowerCase().includes(searchTerm.toLowerCase()) ||
        langue.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      return true;
    }
  });

  return (
    <div className="flex h-screen overflow-y-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <WelcomeBanner />
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              <DashboardAvatars />
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                <FilterButton />
                <Datepicker />
                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                  <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="hidden xs:block ml-2">Add view</span>
                </button>                
              </div>
            </div>
            <div className="grid grid-cols-12 gap-2">
           
           
              <DashboardCard01 />
              <DashboardCard02 />
              <DashboardCard03 />

    <DashboardCard04 /> 
    <DashboardCard05 /> 
    <DashboardCard06 /> 
   < DashboardCard09/>

            </div>
          </div>
        </main>
        <Banner />
      </div>
    </div>
  );
}

export default HomeDashboard;
