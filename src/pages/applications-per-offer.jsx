import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ModalConfirmation from './ModalConfirmation';
import ApplicationDetails from './applicationsDetails'; // Adjust the path as needed
import { connect } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import Navbar from '@/widgets/layout/navbar';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { FaCheckCircle, FaTimesCircle, FaEye } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

const ApplicationsPerOffer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [likedApplications, setLikedApplications] = useState([]);
  const [dislikedApplications, setDislikedApplications] = useState([]);
  const [copiedText, setCopiedText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const applicationsPerPage = 5;

  const { offerId } = useParams(); // Retrieve offerId from the URL
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  // Function to fetch applications by offerId
  useEffect(() => {
      const fetchApplications = async () => {
          try {
              // Retrieve the access token from localStorage
              const accessToken = localStorage.getItem("accessToken");
              if (!accessToken) {
                  console.error("Access token not found");
                  return;
              }

              // Set up headers for authorization
              const config = {
                  headers: {
                      Authorization: `Bearer ${accessToken}`,
                  },
              };

              // Make the API request using axios
              const response = await axios.get(`http://localhost:3000/applications/applicationperoffer/${offerId}`, config);
              
             
                setApplications(response.data);
          } catch (error) {
              console.error('Error fetching applications:', error);
          }
      };

      // Call the function with the current offerId
      fetchApplications();
  }, [offerId]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filteredApplications = applications.filter((application) =>
      application.email.toLowerCase().includes(term)
    );
    
    setSearchResults(filteredApplications); // Update search results based on search term
    setCurrentPage(1); // Reset to the first page when search term changes
  };

  const handleViewMore = async (id) => {
    navigate(`/applications/${id}`);
  };

  const handleLike = (id) => {
    setLikedApplications((prevLikedApplications) => {
      return prevLikedApplications.includes(id)
        ? prevLikedApplications.filter((appId) => appId !== id)
        : [...prevLikedApplications, id];
    });
  };

  const handleDislike = (id) => {
    setDislikedApplications((prevDislikedApplications) => {
      return prevDislikedApplications.includes(id)
        ? prevDislikedApplications.filter((appId) => appId !== id)
        : [...prevDislikedApplications, id];
    });
  };

  const handleCopyText = (text, event) => {
    event.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedText(text);
  };

  const indexOfLastApplication = currentPage * applicationsPerPage;
  const indexOfFirstApplication = indexOfLastApplication - applicationsPerPage;
  const currentApplications = searchResults.slice(indexOfFirstApplication, indexOfLastApplication);

  return (
    <>
      <Navbar />
      <div className="container mx-auto pt-2 py-8">
        <div className="flex justify-center items-center mb-8 mt-20">
          <input
            type="search"
            className="block w-80 px-4 py-2 text-sm text-gray-900 placeholder-gray-500 bg-gray-100 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-black focus:border-gray-500"
            placeholder="Search application by email"
            value={searchTerm}
            onChange={handleSearch} // OnChange event to update search term
          />
        </div>
        {applications.length === 0 ? ( // Check if there are no applications
        <p className="text-center text-gray-700 text-lg mt-20">There is no application for your job offer yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg-grid-cols-3 mt-20 gap-8">
          {applications.map((application) => (
            <div key={application._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-4">
                <p className="text-center mb-2">Email: {application.email}</p>
                <p className="text-center mb-2">motivation: {application.motivation}</p>

                <div className="flex justify-center mb-2">
                  {application.accepted ? (
                    <div className="flex items-center text-green-700">
                      <FaCheckCircle className="h-5 w-5 mr-1" />
                      Accepted
                    </div>
                  ) : application.rejected ? (
                    <div className="flex items-center text-red-500">
                      <FaTimesCircle className="h-5 w-5 mr-1" />
                      Rejected
                    </div>
                  ) : null}
                </div>
                <div className="flex justify-between items-center">
                  <button
                    className="bg-red-700 text-white px-4 py-2 rounded-md"
                    onClick={() => handleViewMore(application._id)}
                  >
                    View More
                  </button>
                  <div className="flex space-x-2">
                    <button onClick={() => handleLike(application._id)}>
                      {likedApplications.includes(application._id) ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
                    </button>
                    <button onClick={() => handleDislike(application._id)}>
                      {dislikedApplications.includes(application._id) ? <ThumbDownAltIcon style={{ color: 'red' }} /> : <ThumbDownAltOutlinedIcon />}
                    </button>
                    <button onClick={(e) => handleCopyText(application.email, e)}>
                      <FileCopyOutlinedIcon />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
           )}
      </div>
    </>
  );
};

export default ApplicationsPerOffer;