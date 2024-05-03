

import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';


import axios from 'axios';
import { useParams } from 'react-router-dom';
import Sidebar from './partials/Sidebar'; // Import Sidebar component

import jsPDF from 'jspdf';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import 'jspdf-autotable';
import { ReactTyped } from "react-typed";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Modal from 'react-modal';
import { ToastContainer, toast } from "react-toastify";
import {
  Typography,
  Alert,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "@/context"; // Import MaterialTailwindControllerProvider
import { Sidenav } from ".";
//import { motion } from 'framer-motion';
//import Banner from "./Banner.png";
//import {fadeIn} from "./variants.jsx";
//import opportunify from "./opportunify.jpg"
function UserDetailsPage({ userId }) {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [showAlerts, setShowAlerts] = React.useState({
    blue: true,
    red: true,
  });
  const [showAlertsWithIcon, setShowAlertsWithIcon] = React.useState({
    blue: true,
    red: true,
  });
  const alerts = ["gray",  "red"];

  const Navigate = useNavigate();

  const { id } = useParams();
 

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editableField, setEditableField] = useState(null);
  const [isSensitiveInfoVisible, setIsSensitiveInfoVisible] = useState(true); // Nouvel état pour suivre la visibilité des informations sensibles

  const [user, setUser] = useState(null);
  const [isBlocked, setIsBlocked] = useState(false);

  const [hoverRating, setHoverRating] = useState(0); // Suivre la note survolée par l'utilisateur
  const [rating, setRating] = useState(user ? user.rating : 0);

  const handleHoverRating = (value) => {
    setHoverRating(value);
  };
  const handleClickRating = (value) => {
    setRating(value);
    // Mettre à jour la note dans la base de données ou effectuer d'autres actions nécessaires
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Check if the access token exists in localStorage
        const accessToken = localStorage.getItem("accessToken");
  
        // If the access token does not exist, throw an error
        if (!accessToken) {
          throw new Error("Access token not found");
        }
  
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
  
        // Fetch user details with the access token included in the headers
        const response = await axios.get(`/user/hey/${id}`, config);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        // Handle error appropriately (e.g., display error message to user)
        setError('Error fetching user details');
        setLoading(false);
      }
    };
  
    // Call the fetchUser function
    fetchUser();
  }, [userId]);
  
  const handleExportToPDF = () => {
    if (user) {
      const pdf = new jsPDF();
      pdf.setFontSize(18);
      pdf.setTextColor(255, 0, 0); // Couleur rouge pour le titre
      pdf.setFont('helvetica', 'bold'); // Police Helvetica en gras pour le titre
      pdf.text(20, 20, `User Details:`);
      pdf.setTextColor(0); // Couleur noire pour le reste du texte
      pdf.setFont('helvetica', 'normal'); // Police Helvetica en normal pour le reste du texte
      let yOffset = 30;
  
      // Crée un tableau de données utilisateur
      const userData = Object.entries(user).map(([key, value]) => [key, value]);
  
      // Définit les en-têtes de colonne du tableau
      const headers = ['Field', 'Value'];
  
      // Crée le tableau avec les données utilisateur et les en-têtes de colonne
      pdf.autoTable({
        startY: yOffset + 10, // Définit la position de départ du tableau
        head: [headers], // Ajoute les en-têtes de colonne
        body: userData, // Ajoute les données utilisateur
        theme: 'striped', // Thème du tableau (bandes alternées)
        styles: {
          textColor: [0], // Couleur du texte en noir
        },
      });
  
      // Enregistre le PDF
      pdf.save(`${user.name}_details.pdf`);
    }
  };const handleFieldClick = (fieldName) => {
    setEditableField(fieldName);
  };
  const handleLinkClick = () => {
    toggleSensitiveInfoVisibility(); // Toggle the visibility of sensitive information
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSaveChanges = async () => {
    try {
      // Check if the access token exists in localStorage
      const accessToken = localStorage.getItem("accessToken");
  
      // If the access token does not exist, throw an error
      if (!accessToken) {
        throw new Error("Access token not found");
      }
  
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
  
      // Send the PUT request to update user data with the access token included in the headers
      await axios.put(`/user/${id}`, user, config);
      
      // If the request is successful, set editableField to null
      setEditableField(null);
      
      // Fetch updated user data after saving changes
      await fetchUser();
    } catch (error) {
      // Handle error appropriately (e.g., display error message to user)
      console.error("Error saving changes:", error);
    }
  };
  
  const toggleSensitiveInfoVisibility = () => {
    setIsSensitiveInfoVisible(prevState => !prevState); // Inverser la visibilité des informations sensibles
  };



  const handleBlockUser = async () => {
    try {
      // Check if the access token exists in localStorage
      const accessToken = localStorage.getItem("accessToken");
  
      // If the access token does not exist, throw an error
      if (!accessToken) {
        throw new Error("Access token not found");
      }
  
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
  
      // Send the PUT request to block the user with the access token included in the headers
      await axios.put(`/user/block/${id}`, null, config);
      
      // If the request is successful, set isBlocked to true to reflect that the user is blocked
      setIsBlocked(true);
      
      // Display success message
      toast.success('User Blocked successfully');
    } catch (error) {
      // Handle error appropriately (e.g., display error message to user)
      console.error('Error blocking user:', error);
    }
  };
  
  const handleUnblockUser = async () => {
    try {
      // Check if the access token exists in localStorage
      const accessToken = localStorage.getItem("accessToken");
  
      // If the access token does not exist, throw an error
      if (!accessToken) {
        throw new Error("Access token not found");
      }
  
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
  
      // Send the PUT request to unblock the user with the access token included in the headers
      await axios.put(`/user/unblock/${id}`, null, config);
      
      // If the request is successful, set isBlocked to false to reflect that the user is unblocked
      setIsBlocked(false);
      
      // Display success message
      toast.success('User unblocked successfully');
    } catch (error) {
      // Handle error appropriately (e.g., display error message to user)
      console.error('Error unblocking user:', error);
    }
  };



  
  return (
    <>
 <div style={{ zIndex: 1000, position: 'fixed', top: 0, left: 0, height: '100vh', width: '250px' }}>

<Sidebar /> {/* Include Sidebar component */}
</div>     <div className="relative ml-40 mt-10">
     
      <div style={{  bottom: '',position: 'fixed', top: '0', left: '50%', transform: 'translateX(-50%)', width: '100%', zIndex: '999' }}>
      <ToastContainer position="top-center" autoClose={5000} />

        <h1 className="text-4xl mt-10 text-center text-red-700 transition-opacity duration-1000 transform hover:scale-105">
          USER DETAILS
        </h1>
      
      <div className="container mr-80 center ml-40" style={{ marginTop: '30px' }}>
        <div className="card mx-auto ml-80" style={{ maxWidth: '700px', padding: '50px', borderRadius: '5px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', transition: 'box-shadow 0.3s ease' }}>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-800">{error}</p>
          ) : user ? (
            <div>
              <p className="ml-20 mr-5 text-3xl">
                {editableField === 'name' ? (
                  <input type="text" name="name" value={user.name} onChange={handleFieldChange} onBlur={handleSaveChanges} />
                ) : (
                  <span onClick={() => handleFieldClick('name')}>{user.name}</span>
                )}
              </p>
              <p className="mb-6 ml-20 mr-5 text-3xl">{isSensitiveInfoVisible ? user.email : '**********'}</p>
              <p className="mb-6 ml-20 mr-5 text-3xl">{editableField === 'role' ? (
                <input type="text" name="role" value={user.role} onChange={handleFieldChange} onBlur={handleSaveChanges} />
              ) : (
                <span onClick={() => handleFieldClick('role')}>{user.role}</span>
              )}</p>
              <p className="mb-6 ml-20 mr-5 text-3xl">{user.image}</p>
              <p className="mb-6 ml-20 mr-5 text-3xl">{user.address}</p>
              <p className="mb-6 ml-20 mr-5 text-3xl">{user.phone}</p>
              <p className="mb-6 ml-20 mr-5 text-3xl">{user.description}</p>
              <p className="mb-6 ml-20 mr-5 text-3xl">{user.lastname}</p>
              <p className="mb-6 ml-20 mr-5 text-3xl">{user.phoneNumber}</p>
              <strong>
                <button onClick={isBlocked ? handleUnblockUser : handleBlockUser}>
                  {isBlocked ? 'Unblock User' : 'Block User'}
                </button>
              </strong>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <button className="btn-primary bg-red-700 text-white py-4 px-1 rounded-lg hover:bg-black transition duration-300 ease-in-out w-full" onClick={handleExportToPDF} style={{ width: '30%' }}>
                  Export to PDF
                </button>
                <div>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className='ml-10 mr-10'>
                    <Link style={{ textDecoration: "none" }} onClick={handleLinkClick} className='ml-10 mr-10'>
                      <strong>
                        <p className='text-red-700' style={{ cursor: "pointer" }}>
                          Did you want to hide sensitive info?
                        </p>
                      </strong>
                    </Link>
                  </motion.div>
                </div>
              </div>
             
              <div className="ml-60 mb-40">
        <Link to="">
          <QRCode value={JSON.stringify(user)} size={128} level="L" />
        </Link>
      </div>
            </div>
          ) : (
            <p>No user found</p>
          )}
        </div>
      </div>
    </div>
    </div>
  </>
  
  );
}

export default UserDetailsPage;
