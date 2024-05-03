import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Sidebar from './partials/Sidebar'; // Import Sidebar component
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { FaGoogle } from 'react-icons/fa'; // Use FaGoogle for Google icon

import { ReactTyped } from 'react-typed';
import { FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Modal from 'react-modal';
import { Typography, Alert, Card, CardHeader, CardBody,  
} from '@material-tailwind/react';

function OfferDetailsPage() {
  const [offer, setOffer] = useState(null); // State to store the offer details
  const { id } = useParams();
  const navigate = useNavigate(); // Use useNavigate for navigation
  const [userName, setUserName] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0); // State to store the rating value

  const [recipientEmail, setRecipientEmail] = useState('');
  useEffect(() => {
    async function fetchOffer() {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(`http://localhost:3000/job_offer/get/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        console.log("Fetched Offer:", response.data); // Afficher la réponse pour déboguer
        setOffer(response.data);
      } catch (error) {
        console.error('Error fetching job offer by ID:', error);
      }
    }
  
    fetchOffer();
  }, [id]);
  
 
 
  // Function to export offer details to PDF
  const handleExportToPDF = () => {
    if (offer) {
      const pdf = new jsPDF();
      pdf.setFontSize(18);
      pdf.setTextColor(255, 0, 0); // Red color for the title
      pdf.setFont('helvetica', 'bold'); // Bold Helvetica font for the title
      pdf.text(20, 20, `Offer Details:`);
      pdf.setTextColor(0); // Black color for the rest of the text
      pdf.setFont('helvetica', 'normal'); // Normal Helvetica font for the rest of the text
      let yOffset = 30;

      // Create a user data array
      const offerData = Object.entries(offer).map(([key, value]) => [key, value]);

      // Set the column headers for the table
      const headers = ['Field', 'Value'];

      // Create the table with offer data and column headers
      pdf.autoTable({
        startY: yOffset + 10, // Set the starting position of the table
        head: [headers], // Add column headers
        body: offerData, // Add offer data
        theme: 'striped', // Table theme (alternating rows)
        styles: {
          textColor: [0], // Black text color
        },
      });

      // Save the PDF
      pdf.save(`${offer.title}_details.pdf`);
    }
  };
  const handleShare = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  }
  
  
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

  const handleSendEmail = async () => {
    if (offer) {
      const companyName = offer.company ? offer.company.name : 'Unknown Company'; // Récupérez le nom de la société ou définissez une valeur par défaut
      // Construct HTML email content
    const offerDetails = `
    Subject: Exciting Career Opportunity at ${companyName}

 Hello ,
    
    We are pleased to inform you of a new job opportunity at ${companyName}. We are currently seeking a ${offer.title} to join our team. As a ${offer.title},
    you will have the opportunity to work in a dynamic and innovative environment, contributing to ${offer.description}.
    Below, you will find the key details of the position, including the primary responsibilities, qualifications, and additional information. 
    
    If you are interested in applying, please review the information provided and follow the instructions at the end of this message.
    our offer responsibilities are ${offer.responsibilities} , also our qualifications:${offer.qualifications},our office is located at  ${offer.lieu},
    The role requires you to work   ${offer.workplace_type} ,The base salary for this position is  ${offer.salary_informations}.

    We encourage you to apply if you meet the qualifications and are looking for a challenging and rewarding career. 
    Should you have any questions or require additional information, please do not hesitate to contact us at Opportunify.Developpers@outlook.tn
    We look forward to receiving your application and discussing the opportunity further.
    
    Best regards,
    
    ${userName},
    Administrator,
    Opportunify. 
`;

    try {
      const accessToken = localStorage.getItem("accessToken");

      await axios.post(
        'http://localhost:3000/job_offer/send',
        {
          recipientEmail,
          message, // Custom message
          offerDetails, // Offer details with HTML formatting
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      toast.success("Email sent successfully!");
      setShowModal(false);
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error("Failed to send email.");
    }
  }
};

  
  
  // Function to handle rating change
  const handleRatingChange = (value) => {
    setRating(value);
    // You can perform additional actions here, such as sending the rating to the backend
  };

  // Function to render the rating emojis
const renderRatingEmojis = () => {
  const emojis = ['😍', '😊', '😐', '😕', '😠']; // You can customize this array of emojis as per your preference
  const feedbacks = ['Excellent', 'Good', 'Neutral', 'Poor', 'Bad']; // Feedback based on rating
  return emojis.map((emoji, index) => (
    <motion.span
      key={index}
      onClick={() => handleRatingChange(index + 1)}
      whileHover={{ scale: 1.5 }} // Scale up animation on hover
      style={{ cursor: 'pointer', fontSize: '30px', marginRight: '10px', color: index < rating ? '#ffc107' : '#e4e5e9' }}
    >
      <span role="img" aria-label={feedbacks[index]}>{emoji}</span>
      {index === rating - 1 && ( // Render feedback only for the selected rating
        <div style={{ position: '', top: 'px', left: '60px', background: '#000', color: '#fff', padding: '5px', borderRadius: '5px', zIndex: '1' }}>
          {feedbacks[index]}
        </div>
      )}
    </motion.span>
  ));
};


  return (
    <>
    <Sidebar /> 
      <ToastContainer position="top-center" autoClose={5000} />

      <div className="container  mr-40   center">
      <h1 style={{ bottom: '620px', left: '800px',position: 'fixed', left: '50%', transform: 'translateX(-50%)', width: '100%', zIndex: '999' }} className="text-4xl mb-8 text-center text-red-700 transition-opacity duration-1000 transform hover:scale-105">
OFFER DETAILS        </h1>  

        <div
className="card mx-auto mb-30 ml-80" style={{ position: 'absolute', bottom: '170px', left: '100px', maxWidth: '1200px', backgroundColor: '#F3F4F6', padding: '100px', borderRadius: '5px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', transition: 'box-shadow 0.3s ease' }}

         
        >
         <div className="card-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  {offer ? (
    <div>
      <h2>{offer.title}</h2>
      <p>Company: {offer.companyName}</p> 

      <p>Description: {offer.description}</p>
      <p>Qualifications: {offer.qualifications}</p>
      <p>Responsibilities: {offer.responsibilities}</p>
      <p>City: {offer.lieu}</p>
      <p>Language: {offer.langue}</p>
      <p>Workplace Type: {offer.workplace_type}</p>
      <p>Field: {offer.field}</p>
      <p>Salary Information: {offer.salary_informations}</p>
      
      {/* Render additional fields as needed */}
    </div>
  ) : (
    <p>Loading...</p>
  )}
</div>

        </div>
   
        <div className="flex justify-center">
  {/* Export to PDF button */}
  <button   style={{ position: 'absolute', bottom: '200px', left: '600px'}}
    className="btn-primary bg-red-700 ml-10 text-white mt-3 py-4 px-1 rounded-lg hover:bg-black transition duration-300 ease-in-out"
    onClick={handleExportToPDF}
  >
    Export to PDF
  </button>
  
 {/* Icon for sharing */}
 <FaGoogle
              className="text-black mt-5 cursor-pointer hover:text-black ml-4"
              onClick={handleShare}
              style={{ position: 'absolute', bottom: '210px', left: '750px', fontSize: '2.3rem' }} // Adjust the font size here
            />
</div>
<div style={{ position: 'absolute', bottom: '207px', left: '800px'}} className="flex items-center ml-40">
            <span className="mr-2"></span>
            {renderRatingEmojis()}
          </div>
        {showModal && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
              <div className="relative bg-white rounded-lg p-8">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="recipientEmail">
                    Recipient's Email Address
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="recipientEmail"
                    type="email"
                    placeholder="Enter email"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                    Personalized Message
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="message"
                    rows="3"
                    placeholder="Enter your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>
                <div className="flex justify-end">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={handleSendEmail}
                  >
                    Send Email
                  </button>
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                    onClick={handleCloseModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
    
      
      </div>
</>  );
}

export default OfferDetailsPage;

