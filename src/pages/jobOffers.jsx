import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Typography, Button, Input } from "@material-tailwind/react";
import { FiMapPin } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import { GrScheduleNew } from "react-icons/gr";
import { GrAid, GrTrash , GrUp , GrDown } from "react-icons/gr";
import { GrCurrency } from "react-icons/gr";
import { formatDistanceToNow } from "date-fns";
import { Navbarjs } from '@/widgets/layout';
import { format } from 'date-fns';
import { JobOfferMap } from '../pages/JobOfferMap';

export function JobofferConsult() {

    const [expandedOfferId, setExpandedOfferId] = useState(null);
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [jobOffers, setJobOffers] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    const [searchResults, setSearchResults] = useState([]); // Nouvel état pour stocker les résultats de recherche
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [offersPerPage] = useState(5); // Nombre d'offres par page
    const [isDataLoaded, setIsDataLoaded] = useState(false); // Indicateur pour savoir si les données sont chargées
    const [searchCriteria, setSearchCriteria] = useState({
        title: "",
        workplaceType: "",
        location: "",
        field: ""
    });

    const [sortBySalary, setSortBySalary] = useState(false);
    const [selectedPosition, setSelectedPosition] = useState(null);

/*   <div className="container mx-auto pt-8">
        {validJobOffers.map((jobOffer) => (
          <Card key={jobOffer._id} className="p-4">
            <Typography variant="title">{jobOffer.title}</Typography>
            <Typography variant="paragraph">{jobOffer.location}</Typography>
            <Button
              onClick={() => handleShowOnMap(jobOffer.latitude, jobOffer.longitude)}
            >
              Voir sur la carte
            </Button>
            <Button
              onClick={() => navigate(`/job-offer-details/${jobOffer._id}`)}
            
              Voir les détails
            </Button>
          </Card>
        ))}

        <JobOfferMap
          jobOffers={validJobOffers}
          selectedPosition={selectedPosition}
        />
      </div> */
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

                const response = await axios.get('/job_offer/getall', config);
                console.log("Job Offers fetched:", response.data); // Vérifier les données récupérées

                setJobOffers(response.data);
                setIsDataLoaded(true); // Marqueur indiquant que les données sont chargées

            } catch (error) {
                console.error('Failed to fetch job offers:', error.response ? error.response.data : error.message);
            }
        };

        fetchJobOffers();
    }, []);

    useEffect(() => {
        const handleSearch = async () => {
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

                const response = await axios.get('/job_offer/search', {
                    params: searchCriteria,
                    ...config
                });
                setSearchResults(response.data);
            } catch (error) {
                console.error('Failed to fetch job offers based on criteria:', error.response ? error.response.data : error.message);
            }
        };

        handleSearch();
    }, [searchCriteria]);

    const formattedDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'dd-MM-yyyy');
    };

    const handleSeeMore = (offerId) => {
        setExpandedOfferId((prevId) => (prevId === offerId ? null : offerId));
        setSelectedOffer(jobOffers.find(jobOffer => jobOffer._id === offerId));
    };

    const handleShowDetails = (offerId) => {
        navigate(`/job-offer-details/${offerId}`);
    };

    const handleRemoveCriteria = (criterion) => {
        setSearchCriteria(prevCriteria => ({
            ...prevCriteria,
            [criterion]: ""
        }));
    };

    const handleClearCriteria = () => {
        setSearchCriteria({
            title: "",
            workplaceType: "",
            location: "",
            field: ""
        });
    };

    const handleSortBySalary = () => {
        setSortBySalary(!sortBySalary);
    };

    let sortedOffers = [...jobOffers];
    if (sortBySalary) {
        sortedOffers.sort((a, b) => {
            return a.salary - b.salary;
        });
    }

    const totalOffersCount = searchResults.length > 0 ? searchResults.length : jobOffers.length;
    const indexOfLastOffer = currentPage * offersPerPage;
    const indexOfFirstOffer = indexOfLastOffer - offersPerPage;
    const currentOffers = searchResults.length > 0 ? searchResults.slice(indexOfFirstOffer, indexOfLastOffer) : sortedOffers.slice(indexOfFirstOffer, indexOfLastOffer);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    
    
    const handleShowOnMap = (latitude, longitude) => {
        if (latitude !== undefined && longitude !== undefined) {
          setSelectedPosition([latitude, longitude]);
        } else {
          console.error('Coordonnées non valides');
        }
      };
    
      const validJobOffers = jobOffers.filter(
        (offer) => offer.latitude !== undefined && offer.longitude !== undefined
      );
    return (
        <>
            <Navbarjs />
            <div className="container mx-auto pt-8 flex">
                {/* Partie des filtres */}
                <div className="w-1/4 pr-4">
                    <Card shadow="xl" className="p-4 bg-gray-50">
                        <div className="mb-4">
                            <Typography variant="title" color="gray">Search Filters:</Typography>
                            <div className="flex flex-wrap mt-2">
                                {/* Titre */}
                                <span className="inline-block bg-red-700 text-white rounded-full px-3 py-1 text-sm font-semibold cursor-pointer m-1">
                                    {searchCriteria.title}
                                </span>
                                {/* Autres critères */}
                                {Object.entries(searchCriteria).map(([key, value]) => {
                                    if (key !== "title" && value) {
                                        return (
                                            <span
                                                key={key}
                                                className="inline-block bg-gray-400 text-gray-800 rounded-full px-3 py-1 text-sm font-semibold cursor-pointer m-1"
                                                onClick={() => handleRemoveCriteria(key)}
                                            >
                                                {value} &times;
                                            </span>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                            <Button className="mt-2 bg-gray-500" title="Clear Filters" onClick={handleClearCriteria}>
                                <GrTrash />
                            </Button>
                        </div>
                        <div className="mb-4">
                            <Typography variant="paragraph" color="gray">Title:</Typography>
                            <Input
                                type="text"
                                placeholder="Search by title"
                                value={searchCriteria.title}
                                onChange={(e) => setSearchCriteria({ ...searchCriteria, title: e.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <Typography variant="paragraph" color="gray">Location:</Typography>
                            <Input
                                type="text"
                                placeholder="Location"
                                value={searchCriteria.location}
                                onChange={(e) => setSearchCriteria({ ...searchCriteria, location: e.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <Typography variant="paragraph" color="gray">Job Field:</Typography>
                            <Input
                                type="text"
                                placeholder="Field"
                                value={searchCriteria.field}
                                onChange={(e) => setSearchCriteria({ ...searchCriteria, field: e.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <Typography variant="paragraph" color="gray">Workplace Type:</Typography>
                            <div className="flex flex-wrap">
                                {["Remote", "On-site", "Hybrid"].map(type => (
                                    <Button
                                        key={type}
                                        color={searchCriteria.workplaceType === type ? "red" : "gray-400"}
                                        onClick={() => setSearchCriteria({ ...searchCriteria, workplaceType: type })}
                                        className="mr-2 mb-2 "
                                    >
                                        {type}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Partie des offres */}
                <div className="w-3/4">
                    <div className="relative flex content-center justify-center">
                        <div className='items-center flex flex-wrap justify-center mt-2'>
                            {currentOffers.map((jobOffer) => (
                                <div key={jobOffer._id} className="shadow-xl m-4 bg-gray-100 rounded-md lex items-center justify-center mt-2 overflow-hidden  h-auto">
                                    <div className="flex items-center justify-center mt-2">
                                        <Typography variant="title" color="#ff6666" className="mb-2 " style={{ fontSize: '24px', fontWeight: 'bold' }}>
                                            {jobOffer.title}
                                        </Typography>
                                        <div>
                                        </div>
                                    </div>
                                    <div className="flex items-center mb-2">
                                        <Typography variant="paragraph" color="blue-gray" className="mr-2">
                                            <FiMapPin />
                                        </Typography>
                                        <Typography variant="paragraph" color="blue-gray" className="mr-8">
                                            {jobOffer.lieu}
                                        </Typography>
                                        <Typography variant="paragraph" color="blue-gray" className="mr-2">
                                            <GrAid />
                                        </Typography>
                                        <Typography variant="paragraph" color="blue-gray" className="mr-8">
                                            {jobOffer.workplace_type}
                                        </Typography>
                                        <Typography variant="paragraph" color="blue-gray" className="mr-2">
                                            <GrCurrency />
                                        </Typography>
                                        <Typography variant="paragraph" color="blue-gray" className="mr-8">
                                            {jobOffer.salary_informations}
                                        </Typography>
                                        <Typography variant="paragraph" color="blue-gray">
                                            <GrScheduleNew />
                                        </Typography>
                                        <Typography variant="paragraph" color="blue-gray" className="mr-2">
                                            deadline: {formattedDate(jobOffer.deadline)}
                                        </Typography>
                                    </div>
                                    <div className="flex items-center justify-center mb-4">
                                        <Button color="blue-grey" onClick={() => handleShowDetails(jobOffer._id)}>
                                            Show Details
                                        </Button>
                                    </div>
                                 
                                             <div className="flex items-center"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-center mt-4">
                        <ul className="flex list-none">
                            {currentPage > 1 && (
                                <li>
                                    <button
                                        onClick={() => paginate(currentPage - 1)}
                                        className={`px-3 py-1 rounded-md mx-1 bg-gray-200 text-black`}
                                    >
                                        Previous
                                    </button>
                                </li>
                            )}
                            {Array.from({ length: Math.ceil(totalOffersCount / offersPerPage) }).map((_, index) => (
                                <li key={index}>
                                    <button
                                        onClick={() => paginate(index + 1)}
                                        className={`px-3 py-1 rounded-md mx-1 ${currentPage === index + 1 ? 'bg-red-700 text-white' : 'bg-gray-200 text-black'}`}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                            {currentPage < Math.ceil(totalOffersCount / offersPerPage) && (
                                <li>
                                    <button
                                        onClick={() => paginate(currentPage + 1)}
                                        className={`px-3 py-1 rounded-md mx-1  text-black`}
                                    >
                                        Next
                                    </button>
                                </li>
                            )}
                        </ul>
                   
                    </div>
                </div>
            </div>

        </>
    );
}

export default JobofferConsult;
