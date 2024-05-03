import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Card, Button } from "@material-tailwind/react";
import Rating from 'react-rating-stars-component';
import Modal from 'react-modal';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import jsPDF from 'jspdf';
import { Navbar } from "@/widgets/layout";
import { format } from 'date-fns';
import {  useNavigate } from 'react-router-dom';


const ApplicationDetails = () => {
  const [ratingText, setRatingText] = useState('');
  const { id } = useParams();
  const [applications, setApplications] = useState(null);
  const [status, setStatus] = useState(null);
  const [rating, setRating] = useState(0);
  const [showRejectConfirmation, setShowRejectConfirmation] = useState(false);
  const [showAcceptConfirmation, setShowAcceptConfirmation] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [buttonState, setButtonState] = useState({ accept: true, reject: true });
  const [isAccepted, setIsAccepted] = useState(applications?.status === 'accepted');
  const [isRejected, setIsRejected] = useState(applications?.status === 'rejected');
  const navigate = useNavigate(); // Use useNavigate for navigation

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

        const response = await axios.get(`http://localhost:3000/applications/${id}`, config);
        setApplications(response.data);
      } catch (error) {
        console.error('Error fetching application details:', error);
      }
    };

    fetchApplicationDetails();
  }, [id]);

  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem('comments')) || [];
    setComments(storedComments);
  }, []);

  useEffect(() => {
    const storedButtonState = JSON.parse(localStorage.getItem('buttonState')) || { accept: true, reject: true };
    setButtonState(storedButtonState);
  }, []);

  const handleAccept = async () => {
    setShowAcceptConfirmation(true);
    //window.location.href =`/CreateEvent/${applications._id}`;
    //navigate(`/CreateEvent/${applications._id}`);

  
  };

  const handleReject = async () => {
    setShowRejectConfirmation(true);
  };

  const handleConfirmAccept = async () => {
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

      await axios.put(`http://localhost:3000/applications/accept/${id}`, null, config);
      setStatus('accepted');
      setShowAcceptConfirmation(false);
      toast.error('Application accepted successfully');

      const response = await axios.get(`http://localhost:3000/applications/${id}`, config);
      setApplications(response.data);
      setButtonState({ accept: false, reject: false });
      localStorage.setItem('buttonState', JSON.stringify({ accept: false, reject: false }));
    } catch (error) {
      console.error('Error accepting application:', error);
    }

    setIsAccepted(true);
  
  };

  const handleConfirmReject = async () => {
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

      await axios.put(`http://localhost:3000/applications/reject/${id}`, null, config);
      setStatus('rejected');
      setShowRejectConfirmation(false);
      toast.success('Application rejected successfully');

      const response = await axios.get(`http://localhost:3000/applications/${id}`, config);
      setApplications(response.data);
      setButtonState({ accept: false, reject: false });
      localStorage.setItem('buttonState', JSON.stringify({ accept: false, reject: false }));
    } catch (error) {
      console.error('Error rejecting application:', error);
    }
    setIsRejected(true);
  };

  const handleRatingChange = (newRating) => {
    console.log('New rating:', newRating);

    let ratingText = '';
    switch (newRating) {
      case 1:
        ratingText = 'Poor';
        break;
      case 2:
        ratingText = 'Acceptable';
        break;
      case 3:
        ratingText = 'Good';
        break;
      case 4:
        ratingText = 'Very Good';
        break;
      case 5:
        ratingText = 'Excellent';
        break;
      default:
        ratingText = '';
        break;
    }

    setRating(newRating);
    setRatingText(ratingText);
  };

  const handleAddComment = () => {
    const newComments = [...comments, comment];
    setComments(newComments);
    localStorage.setItem('comments', JSON.stringify(newComments));
    setComment('');
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleExportCV = async (cvPath) => {
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
  
      // Supprimer le répertoire "ikramm" s'il est inclus dans le chemin du CV
      const cvPathWithoutIkramm = cvPath.replace('ikramm/', '');
  
      const cvBlob = await fetch(`http://localhost:3000/download/cv/${cvPathWithoutIkramm}`, config);
      const cvData = await cvBlob.blob();
      console.log("Fetching CV from:", `http://localhost:3000/download/cv/${cvPathWithoutIkramm}`);
console.log("Headers:", config.headers);

      console.log("CV Blob:", cvBlob);
      
      const doc = new jsPDF();
      const reader = new FileReader();
  
      reader.onloadend = () => {
        const cvContent = reader.result;
        doc.text(`CV: ${cvContent}`, 10, 10);
        doc.save('cv_details.pdf');
      };
      reader.onloadend = () => {
        console.log("CV Content:", reader.result);
        // ... Autres actions à effectuer avec le contenu du fichier
    };
      reader.readAsDataURL(cvData);
    } catch (error) {
      console.error('Error exporting CV PDF:', error);
      // Afficher un message d'erreur à l'utilisateur
    }
  };
  
  const formattedDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'dd-MM-yyyy');
  };
  
  const handleExportCoverLetter = async (coverLetter) => {
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
  

      const coverLetterBlob = await fetch(`http://localhost:3000/download/cover-letter/ikramm/${coverLetter}`, config);
      const coverLetterData = await coverLetterBlob.blob();
  
      const doc = new jsPDF();
      const reader = new FileReader();
  
      reader.onloadend = () => {
        const coverLetterContent = reader.result;
        doc.text(`Cover Letter: ${coverLetterContent}`, 10, 10);
        doc.save('cover_letter_details.pdf');
      };
  
      reader.readAsDataURL(coverLetterData);
    } catch (error) {
      console.error('Error exporting Cover Letter PDF:', error);
      // Afficher un message d'erreur à l'utilisateur
    }
  };
  

  
  if (!applications) {
    return <div>Loading...</div>;
  }

  
  console.log(applications.job_seeker)
  return (
    <>
    <Navbar/>
    
      <ToastContainer position="top-center" autoClose={5000}  />

      <div className=' center text-center mt-40 ml-10 ' style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 999 }}>
        <div className='center text-center mt-40 ml-10' style={{ display: 'flex', justifyContent: 'center' }}>
          <Modal isOpen={showRejectConfirmation || showAcceptConfirmation} onRequestClose={() => setShowRejectConfirmation(false) || setShowAcceptConfirmation(false)} className="custom-modal center text-center mt-40 ml-10">
            <div className="modal-content center text-center mt-40 ml-10">
              {showRejectConfirmation && (
                <>
                  <h4 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'black', fontFamily: 'Arial, sans-serif' }}>Reject Confirmation</h4>
                  <p style={{ fontSize: '1.2rem', color: 'gray', fontFamily: 'Arial, sans-serif' }}>Are you sure you want to reject this application?</p>
                  <Button color="red-800" onClick={handleConfirmReject}>Yes</Button>
                  <Button color="red" onClick={() => setShowRejectConfirmation(false)}>No</Button>
                </>
              )}
              {showAcceptConfirmation && (
                <>
                  <h4 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'black', fontFamily: 'Arial, sans-serif' }}>Accept Confirmation</h4>
                  <p style={{ fontSize: '1.2rem', color: 'gray', fontFamily: 'Arial, sans-serif' }}>Are you sure you want to accept this application?</p>
                  <Button color="black" onClick={handleConfirmAccept}>Yes</Button>
                  <Button color="red" onClick={() => setShowAcceptConfirmation(false)}>No</Button>
                </>
              )}
            </div>
          </Modal>
        </div>
      </div>

      <div className="container relative mx-auto">
        <div className="relative flex content-center justify-center pt-6 pb-8"></div>
      </div>

      <section className="ml-10 mr-10 flex gap-4 items-center">
        <div className="w-full ">

          <div style={{ fontSize: '24px', fontWeight: 'bold' }} className="mt-4 bg-red-800 rounded-lg p-3 text-white border border-red-700 text-center">Here there are the details of application</div>

          <div className="mt-8">

            <Link to={{
    pathname: `/applications-per-offer/${applications.offerId}` }} className="text-blue-600 hover:underline ml-40">
              do you want to get back?
            </Link>

            
          </div>


          <Card className="mt-8 ml-auto mr-auto mb-28 w-80 max-w-screen-lg lg:w-5/6 rounded-lg p-6 bg-gray-200 bg-opacity-90 text-center">
            <div>
            <p className='text-gray-800'>Date: {formattedDate(applications.applicationDate)}</p>
              <p> {applications.applicationId}</p>
              <p className='text-gray-800'>Email: {applications.email}</p>
              <p className='text-gray-800'>Salary Informations: {applications.salaire}</p>

              <p className='text-gray-800'>Disponibility: {applications.disponibilite}</p>
              <p className='text-gray-800 w-full break-words max-w-[calc(100%-8rem)] text-center ml-6'>Motivation: {applications.motivation}</p>
              <br></br>
              <p> <Button color="white" onClick={() => handleExportCV(applications.cv)}>Export Resume</Button>
<Button color="white" onClick={() => handleExportCoverLetter(applications.coverLetter)}>Export Cover Letter </Button></p>
             <br></br>
              
             <Button color="gray" onClick={handleAccept} disabled={isAccepted || isRejected}>
           
              Accept
              
              </Button>

             <Button color="red" onClick={handleReject} disabled={isAccepted || isRejected}>Reject</Button>
              
              <div>
                <Rating
                  count={5}
                  value={rating}
                  onChange={handleRatingChange}
                  size={24}
                  activeColor="#ffd700"
                />
                <p>{ratingText}</p>
              </div>
            </div>
          </Card>
          <div className=' center text-center mt-40 ml-10  mb-4 ' style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 999 }}>
            <input className='  mb-4 '
              type="text"
              placeholder="Add a comment..."
              value={comment}
              onChange={handleCommentChange}
            />
            <Button className="bg-red-700 hover:bg-gray-500 text-white font-bold py-3 px-3 rounded-md shadow-md mr-2  mb-1 " color="black" onClick={handleAddComment}>Add Comment</Button>

           
          </div>
        </div>
      </section>
    
    </>
  );
};

export default ApplicationDetails;
