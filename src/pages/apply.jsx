import React, { useState } from 'react';
import axios from 'axios';

import {
    Card,
    CardBody,
    CardHeader,
    Typography,
    Button,
    Input,
} from "@material-tailwind/react";

import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Navbarjs } from '@/widgets/layout';
import { Email } from '@mui/icons-material';


const Apply = () => {
    const navigate = useNavigate(); // Utilisation de useNavigate pour la redirection
    const handleFileChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    };
    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Validation de la motivation
        if (e.target.name === 'motivation') {
            const isValidMotivation = e.target.value.length >= 200;
            setErrors({ ...errors, motivation: isValidMotivation ? '' : 'Motivation should be at least 200 characters long' });
        }
    };
    const [errors, setErrors] = useState({}); // State for validation errors
    const [formData, setFormData] = useState({
        cv: null,
        coverLetter: null,
        motivation: '',
        disponibilite: '',
        salaire: '',
       
    });
    const { offerId } = useParams();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Valider le formulaire
        const isValid = formIsValid();
    
        if (isValid) {
            // Envoyer le formulaire si celui-ci est valide
            const formData = new FormData(e.target);
            const offerId = formData.get('offerId');
            
            const accessToken = localStorage.getItem("accessToken");
          
            if (!accessToken) {
                console.error("Access token not found");
                alert("Access token not found. Please log in again.");
                return;
            }
          
            const postData = new FormData();
          
            for (const key of formData.keys()) {
                postData.append(key, formData.get(key));
            }
          
            try {
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${accessToken}`,
                    },
                };
          
                await axios.post('http://localhost:3000/applications/apply', postData, config);
                // Redirection vers la page /applications après la soumission réussie
                navigate('/applications');
            } catch (error) {
                console.error('Error submitting application:', error);
                alert('Failed to submit application. Please try again.');
            }
        }
    };
    
    // Fonction pour valider le formulaire
   const formIsValid = () => {
        let errors = {};
    
        if (!formData.motivation.trim()) {
            errors.motivation = "Motivation is required";
        } else if (formData.motivation.length < 200) {
            errors.motivation = "Motivation should be at least 200 characters long";
        }
    
        setErrors(errors); 
        return Object.keys(errors).length === 0; 
    };
    
    
    return (
        <>
        <Navbarjs/>
        <div className="container relative mx-auto">
            <div className="relative flex content-center justify-center pt-12 pb-32">
                <div className="container mx-auto mt-4 max-w-screen-md ">
                    <Card className='mt-8 bg-gray-400 bg-opacity-20 rounded-lg shadow-l '>
                        <CardHeader className='bg-red-800' contentPosition="none">
                            <Typography color="white" variant="h5">
                                Your Form
                            </Typography>
                        </CardHeader>
                        <CardBody >
                            <form onSubmit={handleSubmit}>
                                <div  className="px-4 py-8 grid grid-cols-2 gap-6 md:grid-cols-2 ">
                                <input type="hidden" name="offerId" value={offerId} />
                               
                                <div>
                                    <Typography htmlFor="text" className="block text-sm font-medium text-gray-900 dark:text-white" >Disponibility</Typography>
                                    <Input  type="text" name="disponibilite"  className="input-style" placeholder="Disponibility" required />
                                </div>
                                <div>
                                    <Typography htmlFor="text" className="block text-sm font-medium text-gray-900 dark:text-white">Salary Informations</Typography>
                                    <Input type="text" name="salaire"  className="input-style " placeholder="Salary Informations" required />
                                </div>
                                <div>
                                    <label htmlFor="cv" className="block text-sm font-medium text-gray-900 dark:text-white">Upload Resume</label>
                                    <input type="file" name="cv" onChange={handleFileChange} className="input-style"  />
                                </div>
                                <div>
                                    <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-900 dark:text-white">Upload Cover Letter</label>
                                    <input type="file" name="coverLetter" onChange={handleFileChange} className="input-style"  />
                                </div>
                                </div>
                                <div className='px-4'>
                                    <Typography htmlFor="text" className="block text-sm font-medium text-gray-900 dark:text-white">Motivation</Typography>
                                    <textarea id="motivation" name="motivation" rows="8" className={`block min-w-full text-sm text-gray-900 bg-gray-100 rounded-lg border ${errors.motivation ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder="Write a motivation paragraph" value={formData.motivation} onChange={handleChange} required></textarea>
                                    {errors.motivation && <span className="text-red-500">{errors.motivation}</span>}   
                                </div>
                                
                                <div className="col-span-2 mt-8 flex justify-center">
                                    <Button type="submit" color="red" className="bg-red-800">Submit Application</Button>
                                </div>
                                </form>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
        </>
    );
};

export default Apply;