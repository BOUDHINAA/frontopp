
import 'react-day-picker/dist/style.css';
import { Card, Typography, Button, Input, Textarea,TabPanel} from "@material-tailwind/react";
import axios from "axios";
import React, { useState, useEffect  } from "react";
import { FaAngleRight } from "react-icons/fa6";

import { Breadcrumbs } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { Tooltip } from "@material-tailwind/react";
import {Job_offerConsult} from "./job-offerConsult.jsx";
import {Job_offerUpdate} from "./job-offerUpdate.jsx";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

import {
  Popover,
  PopoverHandler,
  PopoverContent,
 
} from "@material-tailwind/react";
import { Navbar1 } from '@/widgets/layout/index.js';

export function Add_event() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    location: "",
    organizer: "",
    type: "",
    registrationregistrationDeadline: "",
    capacity: "",
    ticket_cost: "",
    contactInformation: "",
    status: "upcoming",
    tags: []
  }
  
  );
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    location: "",
    organizer: "",
    type: "",
    
    registrationregistrationDeadline: "",
    capacity: "",
    ticket_cost: "",
    contactInformation: "",
    status: "",
    tags: []
  });
  const [updatedFormData, setUpdatedFormData] = useState({
    title: "",  });
    const [showSuccessPopover, setShowSuccessPopover] = useState(false);
  const [events, setevents] = useState([]);
  const [expandedEventId, setExpandedEventId] = useState(null);
  const [searchtitle, setSearchtitle] = useState(""); // New state for search status

  const [selectedEventId, setSelectedEventId] = useState(null); // New state for selected event






  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  
    if (e.target.name === "title") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        title: e.target.value.trim() ? "" : "Title cannot be empty",
      }));
    }
  
    // Clear the error message when the input becomes valid
    if (e.target.name === "location" && errors.location) {
      setErrors((prevErrors) => ({ ...prevErrors, location: "" }));
    }
  
    if (e.target.name === "organizer" && errors.organizer) {
      setErrors((prevErrors) => ({ ...prevErrors, organizer: "" }));
    }
    if (e.target.name === "description" && errors.description) {
      setErrors((prevErrors) => ({ ...prevErrors, description: "" }));
    }
    if (e.target.name === "endDate" && errors.endDate) {
        setErrors((prevErrors) => ({ ...prevErrors, endDate: "" }));
      }
      if (e.target.name === "startDate" && errors.startDate) {
        setErrors((prevErrors) => ({ ...prevErrors, startDate: "" }));
      }
    if (e.target.name === "type" && errors.type) {
      setErrors((prevErrors) => ({ ...prevErrors, type: "" }));
    }

    if (e.target.name === "contactInformation" && errors.contactInformation) {
      setErrors((prevErrors) => ({ ...prevErrors, contactInformation: "" }));
    }
    
    if (e.target.name === "status" && errors.status) {
      setErrors((prevErrors) => ({ ...prevErrors, status: "" }));
    }
    
    if (e.target.name === "registrationDeadline" && errors.registrationDeadline) {
      setErrors((prevErrors) => ({ ...prevErrors, registrationDeadline: "" }));
    }
    
    if (e.target.name === "tags" && errors.tags) {
      setErrors((prevErrors) => ({ ...prevErrors, tags: "" }));
    }
    
    if (e.target.name === "ticket_cost" && errors.ticket_cost) {
      setErrors((prevErrors) => ({ ...prevErrors, ticket_cost: "" }));
    }
    if (e.target.name === "capacity" && errors.capacity) {
        setErrors((prevErrors) => ({ ...prevErrors, capacity: "" }));
      }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
        /*
      const accessToken = localStorage.getItem("accessToken");
  
      if (!accessToken) {
        throw new Error("Access token not found");
      }
  
      // Include the access token in the request headers for adding a Event
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };*/
  
      // Add the new Event
      const response = await axios.post("/event/addevent", formData/*, config*/);
      console.log(" added successfully:", response.data);

      window.alert("Event added successfully");
  /*     

      //Fetch updated Events after adding a new one
      const updatedEventsResponse = await axios.get("/event/getallevents", config);
      setevents(updatedEventsResponse.data);
      window.location.href = "/eventslist";*/
    } catch (error) {
      console.error(
        "Failed to add Event:",
        error.response ? error.response.data : error.message
      );
    }
  };
  
  // Fonction pour récupérer tous les offres d'emploi
/*const fetchJobOffers = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken"); // Récupérer le jeton d'accès depuis le stockage local

    if (!accessToken) {
      throw new Error("Access token not found");
    }

    // Inclure le jeton d'accès dans les en-têtes de la requête
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    // Envoyer la requête GET avec les en-têtes d'authentification
    const response = await axios.get('/job_offer/getall', formData,
    config);
    setJobOffers(response.data);
  } catch (error) {
    console.error('Failed to fetch Events:', error.response.data);
  }
};

// Appeler la fonction pour récupérer tous les offres d'emploi lorsque le composant monte
useEffect(() => {
  fetchJobOffers();
}, []);*/
 
  return (
    <>
    
     <div className="container relative mx-auto">
            <div className="relative flex content-center justify-center pt-24 pb-8">
                
   </div>
   </div>
   
      <section className="ml-10 mr-10 flex-col gap-4 items-center">
        <div className="w-full ">
        <div style={{ fontSize: '20px', fontWeight: 'bold' }} className="mt-1 bg-red-800 rounded-lg p-3  text-white  border text-center border-red-700">Enter the information below to create a new event on Opportunify</div>
          <Card className="mt-8 ml-auto mr-auto mb-2 w-80 max-w-screen-lg lg:w-5/6 rounded-lg p-6 bg-gray-100 bg-opacity-90">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-6">
                  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                    Title
                  </Typography>
                  <Input
                    size="regular"
                    placeholder="Enter title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="input-style" required
                  />
                  {errors.title && <Typography variant="small" color="red">{errors.title}</Typography>}
                </div>
                <div className="flex flex-col gap-6">
                  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                    Enter Event location
                  </Typography>
                  <Input
                    size="regular"
                    placeholder="Enter job location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="input-style" required
                  />
                  {errors.location && <Typography variant="small" color="red">{errors.location}</Typography>}
                </div>
                <div className="flex flex-col gap-6">
                  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                    Organizer of the event
                  </Typography>
                  <Input
                    size="regular"
                    placeholder="Enter language required"
                    name="organizer"
                    value={formData.organizer}
                    onChange={handleInputChange}
                    className="input-style" required
                  />
                  {errors.organizer && <Typography variant="small" color="red">{errors.organizer}</Typography>}
                </div>
                <div className="flex flex-col gap-6">
                  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                    Start Date of the event
                  </Typography>
                  <Input
                    size="regular"
                    placeholder="Enter the start date
                "
                type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="input-style" required
                  />
                  {errors.startDate && <Typography variant="small" color="red">{errors.startDate}</Typography>}
                </div>
                <div className="flex flex-col gap-6">
                  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                    Ending Date of the event
                  </Typography>
                  <Input
                    size="regular"
                    placeholder="Enter the start date
                "
                type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="input-style" required
                  />
                  {errors.endDate && <Typography variant="small" color="red">{errors.endDate}</Typography>}
                </div>
                <div className="flex flex-col gap-6">
                  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                    Description
                  </Typography>
                  <Input
                    size="regular"
                    placeholder="Enter event descriptions"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="input-style" required
                  />
                  {errors.description && <Typography variant="small" color="red">{errors.description}</Typography>}
                </div>
                <div className="flex flex-col gap-6">
                  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                    What is your event type ?
                  </Typography>
                  <Input
                    size="regular"
                    placeholder="Enter your event type (seminar,workshop,webniar..)"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="input-style" required
                  />
                  {errors.type && <Typography variant="small" color="red">{errors.type}</Typography>}
                </div>
                <div className="flex flex-col gap-6">
                  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                    Contact Information
                  </Typography>
                  <Input
                    size="regular"
                    placeholder="Enter event contactInformation (mail ,adress..)"
                    name="contactInformation"
                    value={formData.contactInformation}
                    onChange={handleInputChange}
                    className="input-style" required
                  />
                  {errors.contactInformation && <Typography variant="small" color="red">{errors.contactInformation}</Typography>}
                </div>
                <div className="flex flex-col gap-6">
  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
    Choose a status
  </Typography>
  <select
    name="status"
    value={formData.status}
    onChange={handleInputChange}
    className="input-style  block w-full bg-gray-100  border border-gray-400 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 py-3 " required

  >
    <option value="">Select Event type</option>
    <option value="upcoming">Upcoming</option>
    <option value="ongoing">Ongoing</option>
    <option value="past">Past</option>
  </select>
  {errors.status && <Typography variant="small" color="red">{errors.status}</Typography>}
</div>
                <div className="flex flex-col gap-6">
                  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                    Registration Deadline
                  </Typography>
                  <Input
                    size="lg"
                    type="date"
                    placeholder="YYYY-MM-DD"
                    name="registrationDeadline"
                    value={formData.registrationDeadline}
                    onChange={handleInputChange}
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 input-style"  required
                  />
                  {errors.registrationDeadline && <Typography variant="small" color="red">{errors.registrationDeadline}</Typography>}
                </div>
                <div className="flex flex-col gap-6">
                  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                    Tags related to the event
                  </Typography>
                  <Input
                    size="lg"
                    type="text"
                    placeholder="Enter event tags(AI,Web Dev,recruitment..)"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    className="input-style" required
                  />
                  {errors.tags && <Typography variant="small" color="red">{errors.tags}</Typography>}
                </div>
                <div className="flex flex-col gap-6">
                  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                  Capacity number
                  </Typography>
                  <Input
                    size="lg"
                    type="number"
                    placeholder="Enter capacity number of the event"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    className="input-style" required
                  />
                  {errors.capacity && <Typography variant="small" color="red">{errors.capacity}</Typography>}
                </div>
                <div className="flex flex-col gap-6">
                  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                    Ticket/participation Cost
                  </Typography>
                  <Input
                    size="lg"
                    type="number"
                    placeholder="example 30 DT"
                    name="ticket_cost"
                    value={formData.ticket_cost}
                    onChange={handleInputChange}
                    className="input-style" required
                  />
                  {errors.ticket_cost && <Typography variant="small" color="red">{errors.ticket_cost}</Typography>}
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
  <Button type="submit" className="mt-6 bg-red-800">Create Event</Button>
</div>

            </form>
          </Card>
        </div>
      </section>
    </>
  );
}

export default Add_event;