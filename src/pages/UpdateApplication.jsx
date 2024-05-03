import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Input, Button, Typography } from "@material-tailwind/react";
import {  useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Navbarjs } from "@/widgets/layout";
import { Footer } from '@/widgets/layout';
import { GrReturn } from "react-icons/gr";

export function ApplicationUpdate() {
  // Récupérer l'ID de l'application depuis les paramètres d'URL
  const { id } = useParams();
  const navigate = useNavigate();

  // State pour stocker les données de l'application à mettre à jour
  const [formData, setFormData] = useState({
    motivation: "",
    email: "",
    disponibilite: "",
    salaire: "",
    status: "",
    cv: null, // Changer à null
    coverLetter: null, // Changer à null
    job_seeker: "",
    job_offer: "",
  });

  // State pour stocker les erreurs de validation
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchApplication = async () => {
        try {
            // Check if the access token exists in localStorage
            const accessToken = localStorage.getItem("accessToken");

            // If the access token does not exist, handle the error
            if (!accessToken) {
                console.error("Access token not found");
                return;
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };

            const response = await axios.get(`/applications/get/${id}`, config);
            setFormData(response.data);
        } catch (error) {
            console.error("Failed to fetch application:", error.response ? error.response.data : error.message);
        }
    };

    fetchApplication();
}, [id]);

  // Fonction pour mettre à jour l'application
const handleUpdate = async () => {
  try {
      // Check if the access token exists in localStorage
      const accessToken = localStorage.getItem("accessToken");

      // If the access token does not exist, handle the error
      if (!accessToken) {
          console.error("Access token not found");
          return;
      }

      const config = {
          headers: {
              Authorization: `Bearer ${accessToken}`,
          },
      };

      const response = await axios.put(`/applications/update/${id}`, formData, config);
      console.log("Application updated:", response.data);
      // Rediriger vers la page de consultation des applications après la mise à jour
      navigate(`/applicationDetails/${id}`);
  } catch (error) {
      console.error("Failed to update application:", error.response ? error.response.data : error.message);
      // Afficher une alerte en cas d'erreur
      window.alert("Failed to update application");
  }
};


  // Fonction pour gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));


    
        // Fonction pour valider le formulaire
   const formIsValid = () => {
    let errors = {};

    if (formData.motivation.length < 200) {
        errors.motivation = "Motivation should be at least 200 characters long";
    }

    setErrors(errors); 
    return Object.keys(errors).length === 0; 
};
  };

  return (
    <>
 <Navbarjs/>

 <div className="container mx-auto pt-12">
  <h1 className="text-2xl text-white font-bold mb-4 bg-red-800 px-4 py-4 rounded-lg">Update Application</h1>
  <div className="grid grid-cols-2 gap-4 bg-gray-100 p-4">

    <div>
      <Typography variant="small" color="blue-gray" className="mb-1 mt-1 font-medium">
        Disponibility
      </Typography>
      <Input type="text" name="disponibilite" value={formData.disponibilite} onChange={handleChange} placeholder="Disponibilité" />
    </div>

    <div>
      <Typography variant="small" color="blue-gray" className="mb-1 mt-1 font-medium">
        Salary Informations
      </Typography>
      <Input type="text" name="salaire" value={formData.salaire} onChange={handleChange} placeholder="Salaire" />
    </div>


    <div>
      <Typography variant="small" color="blue-gray" className="mb-1 mt-1 font-medium">
        Upload New Resume
      </Typography>
      <Input type="file" name="cv" onChange={handleChange} />
    </div>

  

    <div>
      <Typography variant="small" color="blue-gray" className="mb-1 mt-1 font-medium">
        Upload New Cover Letter
      </Typography>
      <Input type="file" name="coverLetter" onChange={handleChange} />
    </div>

    <div className="col-span-2">
            <Typography variant="small" color="blue-gray" className="mb-1 mt-1 font-medium">
              Motivation
            </Typography>
            <textarea
              type="text"
              name="motivation"
              className={`w-full h-24 ${errors.motivation ? 'border-red-500' : ''}`}
              value={formData.motivation}
              onChange={handleChange}
              placeholder="Motivation"
            />
            {errors.motivation && <p className="text-red-500 text-sm mt-1">{errors.motivation}</p>}
          </div>

  </div>

  <div className="flex justify-center mt-8">
    <Button onClick={handleUpdate} className="w-60 bg-red-800">Update</Button>
  </div>

  <div className=" justify-end mt-4">
    <Link
      to={`/applicationDetails/${id}`}
      className="inline-block p-1 text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
    >
      <GrReturn/>
    </Link>
  </div>
</div>

        


        <Footer/>

    </>
  );
}

export default ApplicationUpdate;
