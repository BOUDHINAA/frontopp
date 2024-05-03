import React from "react";
import { Card, CardHeader, Typography, Avatar, Chip, Tooltip, Progress } from "@material-tailwind/react";

import Sidebar from './partials/Sidebar'; // Import Sidebar component
import axios from 'axios';
import { TrashIcon } from "@heroicons/react/24/solid";
import { Link,useNavigate } from 'react-router-dom'; // Import useNavigate
// Remplacez ceci
import { ToastContainer, toast } from "react-toastify";
import { EyeIcon } from '@heroicons/react/24/solid'; // Import EyeIcon
import  { useState, useEffect } from "react";

import {
 
 
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,

} from "@material-tailwind/react";


export function Offers() {
    const [jobOffers, setJobOffers] = useState([]);
  
    const [searchTerm, setSearchTerm] = useState("");
  
  
  const navigate = useNavigate(); // Initialize useNavigate
  
    const viewUserr = (offer) => {
      navigate(`/job_offer/${offer._id}`);
    };
    //
    
    const handleSearch = (e) => {
      setSearchTerm(e.target.value);
    };
  useEffect(() => {
    const fetchJobOffers = async () => {
      try {
        // Vérifier d'abord si le jeton d'accès existe
        const accessToken = localStorage.getItem("accessToken");
  
        if (!accessToken) {
          throw new Error("Access token not found");
        }
  
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
  
        // Récupérer les offres d'emploi avec le jeton d'accès inclus dans les en-têtes de la requête
        const response = await axios.get("http://localhost:3000/job_offer/getall", config);
        setJobOffers(response.data);
      } catch (error) {
        console.error("Error fetching job offers:", error);
      }
    };
    const viewUserr = (user) => {
      navigate(`/user/${user._id}`);
    };
    const filteredJobOffers = jobOffers.filter((offer) => {
      const { title, description, qualifications, responsibilities, lieu, langue } = offer;
      // Check if searchTerm is defined before using includes()
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
        // If searchTerm is undefined, include all job offers
        return true;
      }
    });
  
    // Appeler la fonction fetchJobOffers
    fetchJobOffers();
  }, []);
  const handleDelete = async (offerId) => {
    try {
      // Check if the access token exists
      const accessToken = localStorage.getItem("accessToken");
  
      if (!accessToken) {
        throw new Error("Access token not found");
      }
  
      // Include the access token in the request headers
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
  
      // Delete the job offer
      await axios.delete(`/job_offer/delete/${offerId}`, config);
  
      // Update the jobOffers state by filtering out the deleted offer
      setJobOffers(jobOffers.filter(offer => offer._id !== offerId));
    } catch (error) {
      toast.success('Failed to delete job offer:', error.response ? error.response.data : error.message);
      toast.error('Failed to delete job offer');
    }
  };
  
    const filteredJobOffers = jobOffers.filter((offer) => {
      const { title, description, qualifications, responsibilities, lieu, langue } = offer;
      // Check if searchTerm is defined before using includes()
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
        // If searchTerm is undefined, include all job offers
        return true;
      }
    });

  
  return (
  <>
   <div style={{ zIndex: 1000, position: 'fixed', top: 0, left: 0, height: '100vh', width: '250px' }}>

<Sidebar /> {/* Include Sidebar component */}
</div>    <div style={{  bottom: '',position: 'fixed', top: '0', left: '50%', transform: 'translateX(-50%)', width: '100%', zIndex: '999' }}>

        <CardHeader variant="gradient"  className="mb-8 mt-5  bg-red-700 p-6 ml-80">
        <ToastContainer position="top-center" autoClose={5000} />

        <header className="px-5 py-4 dark:border-slate-700 ">
        <h2 className="font-semibold  text-white text-slate-800 white:text-slate-100">Opportunify Offers</h2>
      </header>
        </CardHeader>
     
        <div className="mb-4 ml-80">
      <input
  type="text"
  placeholder="Search job offers..."
  value={searchTerm} 
  onChange={handleSearch} 
  className="p-5 border  rounded-md focus:outline-none "
/> 
      </div>
    
    
    <CardBody className=" px-0 pt-0 pb-2 ml-80 ">
      <table className="w-full min-w-[640px] table-auto">
        <thead>
          <tr>
            <th className="border-black py-3 px-6 text-left text-black text-[13px] font-bold cursor-pointer">
              <Typography variant="small" className="border-black uppercase ttext-black text-[13px] font-bold">
                Title
              </Typography>
            </th>
            <th className="border-black py-3 px-6 text-left text-black text-[13px] font-bold cursor-pointer">
              <Typography variant="small" className="border-black uppercase ttext-black text-[13px] font-bold">
                Description
              </Typography>
            </th>
            <th className="border-black py-3 px-6 text-left text-black text-[13px] font-bold cursor-pointer">
              <Typography variant="small" className="border-black uppercase ttext-black text-[13px] font-bold">
              qualifications              </Typography>
            </th>
            <th className="border-black py-3 px-6 text-left text-black text-[13px] font-bold cursor-pointer">
              <Typography variant="small" className="border-black uppercase ttext-black text-[13px] font-bold">
              responsibilities
              </Typography>
            </th>
            <th className="border-black py-3 px-6 text-left text-black text-[13px] font-bold cursor-pointer">
              <Typography variant="small" className="border-black uppercase ttext-black text-[13px] font-bold">
              City
              </Typography>
            </th>
            <th className="border-black py-3 px-6 text-left text-black text-[13px] font-bold cursor-pointer">
              <Typography variant="small" className="border-black uppercase ttext-black text-[13px] font-bold">
              language
              </Typography>
            </th>
          
            {/* Ajoute d'autres colonnes au besoin */}
          </tr>
        </thead>
        <tbody>
        {filteredJobOffers.map((offer) => (  // Change jobOffers.map to filteredJobOffers.map
            <tr key={offer._id}>
              <td className="border-b border-gray-50 py-3 px-6 text-left">{offer.title}</td>
              <td className="border-b border-gray-50 py-3 px-6 text-left">{offer.description}</td>
              <td className="border-b border-gray-50 py-3 px-6 text-left">{offer.qualifications}</td>
              <td className="border-b border-gray-50 py-3 px-6 text-left">{offer.responsibilities}</td>
              <td className="border-b border-gray-50 py-3 px-6 text-left">{offer.lieu}</td>
              <td className="border-b border-gray-50 py-3 px-6 text-left">{offer.langue}</td>
              
      <td>
      <button onClick={() => viewUserr(offer)}>
        <EyeIcon className="w-5 h-5  mr-10 text-gray-700" /> {/* Utilisez EyeIcon ici */}
      </button>
        <button onClick={() => handleDelete(offer._id)}>
          <TrashIcon className="w-8 h-6 text-red-600" />
        </button>
       
      </td>

              {/* Ajoute d'autres colonnes au besoin */}
            </tr>
          ))}
        </tbody>
      </table>
    </CardBody>
      </div>

      </>  );
}

export default Offers;