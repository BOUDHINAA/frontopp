import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,useNavigate, Link } from 'react-router-dom';
import { Card, Typography, Button, Input } from "@material-tailwind/react";
import { GrScheduleNew } from "react-icons/gr";
import { GrAid , GrReturn } from "react-icons/gr";
import { GrCurrency } from "react-icons/gr";
import { Navbar } from '@/layout';
import { Navbarjs } from '@/widgets/layout';
import { format } from 'date-fns';

const ApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [applicationDetails, setApplicationDetails] = useState(null);
  const [jobOfferTitle, setJobOfferTitle] = useState('');
  const [isApplyDisabled, setIsApplyDisabled] = useState(false);
  
  useEffect(() => {
    const fetchApplicationDetails = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          console.error("Access token not found");
          return;
        }
  
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
  
        const response = await axios.get(`http://localhost:3000/applications/get/${id}`, config);
        setApplicationDetails(response.data);
  
        // Fetch job offer title if job_offer exists
        if (response.data.job_offer) {
          const title = await fetchJobOfferTitle(response.data.job_offer);
          setJobOfferTitle(title);
        }

        // Check if the application deadline is passed
        const jobOfferResponse = await axios.get(`http://localhost:3000/job_offer/get/${response.data.job_offer}`, config);
        const deadline = new Date(jobOfferResponse.data.deadline);
        const currentDate = new Date();
        if (deadline < currentDate) {
          setIsApplyDisabled(true);
        }
      } catch (error) {
        console.error('Error fetching application details:', error);
      }
    };
  
    fetchApplicationDetails();
  }, [id]);

  const fetchJobOfferTitle = async (offerId) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("Access token not found");
        return 'Unknown Job Offer';
      }
  
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      // Check if offerId is null before fetching job offer title
      if (!offerId) {
        return 'Unknown Job Offer';
      }

      // Assurez-vous que l'identifiant de l'offre d'emploi est converti en chaîne de caractères
      const offerIdString = offerId._id.toString();
  
      const response = await axios.get(`http://localhost:3000/job_offer/get/${offerIdString}`, config);
      return response.data.title;
    } catch (error) {
      console.error('Error fetching job offer title:', error);
      return 'Unknown Job Offer';
    }
  };
  
  const handleUpdateSuccess = () => {
    // Rechargez la page pour obtenir les dernières données de l'application depuis le serveur
    window.location.reload();
  };
  const formattedDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'dd-MM-yyyy');
  };

  return (
    <>
    <div className="bg-gray-100">
      <Navbarjs />
      <div className='items-center justify-center flex pt-6'>
        <div className="bg-white rounded-lg shadow-lg space-y-8 p-8 max-w-screen-md mb-4">
  
          <h2 className="text-2xl font-bold text-gray-80">Application Details</h2>
          {applicationDetails && (
            <div className="space-y-2 ml-5 text-xl">
              <div className="flex items-center">
                <Typography variant="paragraph" color="blue-gray" className="mr-2">
                  <GrAid />
                </Typography>
                <p className="ml-2 text-gray-800 font-semibold">Job Offer Title:</p>
                <p className="text-gray-600 ml-5">{jobOfferTitle}</p>
              </div>
              <div className="flex items-center ">
                <Typography variant="paragraph" color="blue-gray">
                  <GrScheduleNew />
                </Typography>
                <p className="ml-2 text-gray-800 font-semibold">Date:</p>
                <p className="text-gray-600 ml-5"> {formattedDate(applicationDetails.applicationDate)}</p>
              </div>
  
              <div className="flex items-center">
                <Typography variant="paragraph" color="blue-gray" className="mr-2">
                  <GrCurrency />
                </Typography>
                <p className="ml-2 text-gray-800 font-semibold">Salary Information:</p>
                <p className="text-gray-600 ml-5">{applicationDetails.salaire}</p>
              </div>
              <div className="flex items-center">
                <Typography variant="paragraph" color="blue-gray">
                  <GrScheduleNew />
                </Typography>
                <p className="ml-2 text-gray-800 font-semibold">Disponibility:</p>
                <p className="text-gray-600 ml-5">{applicationDetails.disponibilite}</p>
              </div>
              <div className="flex items-start">
                <Typography variant="paragraph" color="blue-gray" className="mr-2">
                  <GrAid />
                </Typography>
                <p className="ml-2 text-gray-800 font-semibold">Motivation:</p>
              </div>
              <div className="text-gray-600 w-full break-words max-w-[calc(100%-8rem)]">{applicationDetails.motivation}</div>
            </div>
          )}
  
          <div className="flex justify-center">
            <Link
              to={`/updateApplication/${id}`}
              className={`bg-red-800 text-white px-4 py-2 rounded-md inline-block ${isApplyDisabled ? 'pointer-events-none opacity-50' : ''}`}
            >
              Update Application
            </Link>
          </div>
          <div className=" justify-end">
            <Link
              to={`/applications`}
              className="inline-block p-1 text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <GrReturn/>
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
             
            </Link>
          </div>
        </div>
      </div>
    </div>
  </>
  
  );
};

export default ApplicationDetails;