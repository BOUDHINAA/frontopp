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

const ApplicationsList = () => {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [likedApplications, setLikedApplications] = useState([]);
  const [dislikedApplications, setDislikedApplications] = useState([]);
  const [copiedText, setCopiedText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const applicationsPerPage = 5;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          console.error('Access token not found');
          return;
        }

        const config = { headers: { Authorization: `Bearer ${accessToken}` } };
        const response = await axios.get('http://localhost:3000/applications/getall', config);
        setApplications(response.data);
        setSearchResults(response.data); // Set initial search results to all applications
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchApplications();
  }, []);

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
  let currentApplications;
  if (Array.isArray(searchResults)) {
    currentApplications = searchResults.slice(indexOfFirstApplication, indexOfLastApplication);
  } else {
    currentApplications = applications.slice(indexOfFirstApplication, indexOfLastApplication);
  }


  return (
    <>
      <Navbar />
      <div className="container mx-auto pt-2 py-8">
        <div className="flex justify-center items-center mb-8 mt-4">
          <input
            type="search"
            className="block w-80 px-4 py-2 text-sm text-gray-900 placeholder-gray-500 bg-gray-100 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-black focus:border-gray-500"
            placeholder="Search application by email"
            value={searchTerm}
            onChange={handleSearch} // OnChange event to update search term
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg-grid-cols-3 gap-8">
          {currentApplications.map((application) => (
            <div key={application._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-4">
                <p className="text-center mb-2">Email: {application.email}</p>
                {application.job_seeker && (
                  <p className="text-center mb-2">Name: {application.job_seeker.name}</p>
                )}
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

        <div className="mt-8 flex justify-center">
  <button 
    onClick={() => setCurrentPage(currentPage - 1)} 
    disabled={currentPage === 1} // Désactiver le bouton précédent sur la première page
    className="px-3 py-1 rounded-md mx-1 bg-gray-200 text-black"
  >
    Previous
  </button>
  <button 
    onClick={() => setCurrentPage(currentPage + 1)} 
    disabled={currentApplications.length < applicationsPerPage} // Désactiver le bouton suivant lorsque la dernière page est atteinte
    className="px-3 py-1 rounded-md mx-1 bg-gray-200 text-black"
  >
    Next
  </button>
</div>

      </div>
    </>
  );
};

export default ApplicationsList;