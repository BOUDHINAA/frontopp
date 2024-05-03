import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ModalConfirmation from './ModalConfirmation';
import { GrAid, GrTrash , GrUp , GrClock} from "react-icons/gr";
import { Navbarjs } from "@/widgets/layout";
import { format } from 'date-fns';
import { FaCheckCircle, FaTimesCircle, FaEye  } from 'react-icons/fa';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('date');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [jobOfferTitles, setJobOfferTitles] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [applicationsPerPage] = useState(5); // Nombre d'applications par page

  useEffect(() => {
    const fetchApplications = async () => {
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
  
        const response = await axios.get('http://localhost:3000/applications/application/user', config);
  
        if (response.data && response.data.message === 'No applications found for the user') {
          console.log(response.data.message); 
          setApplications([]); 
        } else {
          setApplications(response.data);
        }
      } 
      catch (error) {
        console.error('Error fetching applications:', error);
      }
    };
    fetchApplications();
  }, []);

  useEffect(() => {
    const fetchJobOfferTitles = async () => {
      const titles = {};
      await Promise.all(applications.map(async (application) => {
        try {
          const title = await fetchJobOfferTitle(application.job_offer);
          titles[application._id] = title;
        } catch (error) {
          console.error('Error fetching job offer title:', error);
          titles[application._id] = 'Unknown Job Offer';
        }
      }));
      setJobOfferTitles(titles);
    };
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
        const response = await axios.get(`http://localhost:3000/job_offer/get/${offerId}`, config);
        return response.data.title;
      } catch (error) {
        console.error('Error fetching job offer title:', error);
        return 'Unknown Job Offer';
      }
    };
    fetchJobOfferTitles();
  }, [applications]);

  useEffect(() => {
    const handleSearch = async () => {
      try {
        let response;
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          throw new Error("Access token not found");
        }
        
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
  
        let url;
        switch (searchType) {
          case 'date':
            // Format the date to match the server's expectations (yyyy-MM-dd)
            const formattedDate = formatDateToServer(searchTerm);
            url = `http://localhost:3000/applications/search/date/${formattedDate}`;
            break;
          default:
            break;
        }
  
        // Make the request using Axios
        response = await axios.get(url, config);
        setSearchResults(response.data); // Mettez à jour les résultats de la recherche
      } catch (error) {
        console.error('Error searching:', error);
      }
    };
    
    handleSearch();
  }, [searchTerm, searchType]);
  
  // Fonction pour formater la date au format 'yyyy-MM-dd' pour la requête de recherche
  const formatDateToServer = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  const handleDelete = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("Access token not found");
        return;
      }
      await axios.delete(`http://localhost:3000/applications/delete/${selectedApplication._id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      // Actualiser la liste des applications après la suppression
      const response = await axios.get('http://localhost:3000/applications/application/user', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setApplications(response.data);
    } catch (error) {
      console.error('Error deleting application:', error);
    }
    setIsConfirmationOpen(false);
  };
  
  const formattedDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'dd-MM-yyyy');
  };
  
  const indexOfLastApplication = currentPage * applicationsPerPage;
  const indexOfFirstApplication = indexOfLastApplication - applicationsPerPage;
  const currentApplications = searchResults.length > 0 ? searchResults.slice(indexOfFirstApplication, indexOfLastApplication) : applications.slice(indexOfFirstApplication, indexOfLastApplication);
  
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= Math.ceil((searchResults.length > 0 ? searchResults.length : applications.length) / applicationsPerPage)) {
      setCurrentPage(pageNumber);
    }
  };


  const [status, setStatus] = useState('');
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          console.error("Access token not found");
          return;
        }
        const response = await axios.get(`http://localhost:3000/applications/search/${status}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setApplications(response.data);
      } catch (error) {
        console.error('Error fetching applications by status:', error);
      }
    };
  
    if (status === 'accepted' || status === 'rejected') {
      fetchApplications();
    }
  }, [status]);
  return (
    <>
      <Navbarjs/>
      <div className="container relative mx-auto">
        <div className="relative flex content-center justify-center pt-12 pb-32">
          <div className="container mt-8 w-full">
            <div className="flex justify-center items-center">
              <input
                type="date"
                className="block w-80 px-4 py-2 text-sm text-gray-900 placeholder-gray-500 bg-gray-100 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-black focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-gray-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(new Date(e.target.value))}
              />


<button type="button" class=" ml-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={() => setStatus('accepted')}>Accepted Applications</button>
      <button type="button" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={() => setStatus('rejected')}>Rejected Applications</button>
            </div>
         

            <div className="flex flex-wrap justify-center pt-8">
              {currentApplications.map(application => (
                <div key={application._id} className="m-4 bg-gray-100 rounded-md w-96 shadow-lg overflow-hidden h-auto">
                  <div className="flex items-center justify-center mt-2">
                    {/* Afficher l'icône en fonction de l'état de l'application */}
                    <div className="flex justify-center mb-2">
                      {application.accepted && (
                        <div className="flex items-center text-green-700 mr-2">
                          <FaCheckCircle className="h-5 w-5 mr-1" />
                          Accepted
                        </div>
                      )}
                      {application.rejected && (
                        <div className="flex items-center  text-red-500 mr-2">
                          <FaTimesCircle className="h-5 w-5 mr-1" />
                          Rejected
                        </div>
                      )}
                      {!application.accepted && !application.rejected && (
                        <div className="flex items-center text-yellow-800 mr-2">
                          <FaEye className="h-5 w-5 mr-1" />
                          Under review
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-center "><p className="font-semibold ">Job Offer Title: </p>{jobOfferTitles[application._id]}</p>
                  <p className="text-center "><p className="font-semibold ">Application Date: </p> {formattedDate(application.applicationDate)}</p>
                  <div className="flex justify-center mt-4 mb-4">
                    <Link to={`/applicationDetails/${application._id}`} className="bg-blue-gray-500 text-white px-4 py-2 rounded">
                      Show Details
                    </Link>
                    <button className="bg-red-700 text-white px-4 py-2 rounded" onClick={() => {
                      setSelectedApplication(application);
                      setIsConfirmationOpen(true);
                    }}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <ModalConfirmation isOpen={isConfirmationOpen} onClose={() => setIsConfirmationOpen(false)} onConfirm={handleDelete} />
        </div>
        <div className="flex justify-center mt-4">
          <ul className="flex list-none">
            {currentPage > 1 && (
              <li>
                <button
                  onClick={() => paginate(currentPage - 1)}
                  className={`px-3 py-1 rounded-md mx-1 bg-gray-200 text-black`}
                >
                </button>
              </li>
            )}
            {Array.from({ length: Math.ceil((searchResults.length > 0 ? searchResults.length : applications.length) / applicationsPerPage) }).map((_, index) => (
              <li key={index}>
                <button
                  onClick={() => paginate(index + 1)}
                  className={`px-3 py-1 rounded-md mx-1 ${currentPage === index + 1 ? 'bg-red-700 text-white' : 'bg-gray-200 text-black'}`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            {currentPage < Math.ceil((searchResults.length > 0 ? searchResults.length : applications.length) / applicationsPerPage) && (
              <li>
                <button 
                  onClick={() => paginate(currentPage + 1)}
                  className={`px-3 py-1 mb-10 rounded-md mx-1  text-black`}
                >
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Applications;