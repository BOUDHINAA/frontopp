import 'react-day-picker/dist/style.css';
import { Card, Typography, Button, Input, Textarea,TabPanel} from "@material-tailwind/react";
import axios from "axios";
import React, { useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { Navbar } from '@/layout/index.js';

export function Job_offer() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    qualifications: "",
    responsibilities: "",
    lieu:"",
    langue:"",
    workplace_type: "",
    field: "",
    salary_informations: "",
    deadline: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    qualifications: "",
    responsibilities: "",
    lieu: "",
    langue: "",
    workplace_type: "",
    field: "",
    salary_informations: "",
    deadline: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    validateInput(e.target.name, e.target.value);
  };

  const validateInput = (name, value) => {
    switch (name) {
      case "title":
        setErrors((prevErrors) => ({
          ...prevErrors,
          title: value.length >= 5 ? "" : "Title must be at least 5 characters long",
        }));
        break;
      case "lieu":
        setErrors((prevErrors) => ({
          ...prevErrors,
          lieu: value.length >= 5 ? "" : "Job location must be at least 5 characters long",
        }));
        break;
      case "description":
        setErrors((prevErrors) => ({
          ...prevErrors,
          description: value.length >= 10 ? "" : "Description must be at least 10 characters long",
        }));
        break;
      case "qualifications":
        setErrors((prevErrors) => ({
          ...prevErrors,
          qualifications: value.trim() ? "" : "Qualifications cannot be empty",
        }));
        break;
     
        case "responsibilities":
          setErrors((prevErrors) => ({
            ...prevErrors,
            responsibilities: value.trim() ? "" : "Responsibilities cannot be empty",
          }));
          break;
      case "langue":
        setErrors((prevErrors) => ({
          ...prevErrors,
          langue: value.trim() ? "" : "Language cannot be empty",
        }));
        break;
      case "workplace_type":
        setErrors((prevErrors) => ({
          ...prevErrors,
          workplace_type: value.trim() ? "" : "Workplace type cannot be empty",
        }));
        break;
      case "field":
        setErrors((prevErrors) => ({
          ...prevErrors,
          field: value.trim() ? "" : "Field cannot be empty",
        }));
        break;
        case "salary_informations":
          const salaryRegex = /^\d{3,}\s*(\$|DT|€)$/;
          setErrors((prevErrors) => ({
            ...prevErrors,
            salary_informations: salaryRegex.test(value) ? "" : "Salary information must contain at least 3 numbers followed by a currency symbol ($, DT or €)",
          }));
          break;
          case "deadline":
            setErrors((prevErrors) => ({
              ...prevErrors,
              deadline: value ? "" : "Deadline cannot be empty",
            }));
            break;
      default:
        break;
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate all fields before submitting the form
    Object.keys(formData).forEach((name) => validateInput(name, formData[name]));
    // Check if there are any errors
    if (Object.values(errors).some((error) => error)) {
      console.error("Form validation failed");
      return;
    }
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Access token not found");
      }
      const config = { headers: { Authorization: `Bearer ${accessToken}` } };
      const response = await axios.post("/job_offer/add", formData, config);
      console.log("Job offer added successfully:", response.data);
      const updatedJobOffersResponse = await axios.get("/job_offer/company/joboffers", config);
      window.location.href = "/Job_offerConsult";
    } catch (error) {
      console.error(
        "Failed to add job offer:",
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
    console.error('Failed to fetch job offers:', error.response.data);
  }
};

// Appeler la fonction pour récupérer tous les offres d'emploi lorsque le composant monte
useEffect(() => {
  fetchJobOffers();
}, []);*/
 
  return (
    <>
    <Navbar/>
     <div className="container relative mx-auto">
            <div className="relative flex content-center justify-center pt-24 pb-8">
                
   </div>
   </div>
   
      <section className="ml-10 mr-10 flex gap-4 items-center">
        <div className="w-full ">
        <div style={{ fontSize: '24px', fontWeight: 'bold' }} className="mt-4 bg-red-800 rounded-lg p-3  text-white  border border-red-700">Enter the information below to create the offer</div>
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
                    Enter job location
                  </Typography>
                  <Input
                    size="regular"
                    placeholder="Enter job location"
                    name="lieu"
                    value={formData.lieu}
                    onChange={handleInputChange}
                    className="input-style" required
                  />
                  {errors.lieu && <Typography variant="small" color="red">{errors.lieu}</Typography>}
                </div>
                <div className="flex flex-col gap-6">
                  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                    Language required
                  </Typography>
                  <Input
                    size="regular"
                    placeholder="Enter language required"
                    name="langue"
                    value={formData.langue}
                    onChange={handleInputChange}
                    className="input-style" required
                  />
                  {errors.langue && <Typography variant="small" color="red">{errors.langue}</Typography>}
                </div>
                <div className="flex flex-col gap-6">
                  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                    Description
                  </Typography>
                  <Input
                    size="regular"
                    placeholder="Enter job descriptions"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="input-style" required
                  />
                  {errors.description && <Typography variant="small" color="red">{errors.description}</Typography>}
                </div>
                <div className="flex flex-col gap-6">
                  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                    Qualifications
                  </Typography>
                  <Input
                    size="regular"
                    placeholder="Enter job qualifications"
                    name="qualifications"
                    value={formData.qualifications}
                    onChange={handleInputChange}
                    className="input-style" required
                  />
                  {errors.qualifications && <Typography variant="small" color="red">{errors.qualifications}</Typography>}
                </div>
                <div className="flex flex-col gap-6">
                  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                    Responsibilities
                  </Typography>
                  <Input
                    size="regular"
                    placeholder="Enter job responsibilities"
                    name="responsibilities"
                    value={formData.responsibilities}
                    onChange={handleInputChange}
                    className="input-style" required
                  />
                  {errors.responsibilities && <Typography variant="small" color="red">{errors.responsibilities}</Typography>}
                </div>
                <div className="flex flex-col gap-6">
  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
    Workplace Type
  </Typography>
  <select
    name="workplace_type"
    value={formData.workplace_type}
    onChange={handleInputChange}
    className="input-style  block w-full bg-gray-100  border border-gray-400 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 py-3 " required

  >
    <option value="">Select workplace type</option>
    <option value="Remote">Remote</option>
    <option value="On-site">On-site</option>
    <option value="Hybrid">Hybrid</option>
  </select>
  {errors.workplace_type && <Typography variant="small" color="red">{errors.workplace_type}</Typography>}
</div>
                <div className="flex flex-col gap-6">
                  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                    Deadline
                  </Typography>
                  <Input
                    size="lg"
                    type="date"
                    placeholder="YYYY-MM-DD"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 input-style"  required
                  />
                  {errors.deadline && <Typography variant="small" color="red">{errors.deadline}</Typography>}
                </div>
                <div className="flex flex-col gap-6">
                  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                    Field
                  </Typography>
                  <Input
                    size="lg"
                    type="text"
                    placeholder="Enter job field"
                    name="field"
                    value={formData.field}
                    onChange={handleInputChange}
                    className="input-style" required
                  />
                  {errors.field && <Typography variant="small" color="red">{errors.field}</Typography>}
                </div>
                <div className="flex flex-col gap-6">
                  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                    Salary Informations
                  </Typography>
                  <Input
                    size="lg"
                    type="text"
                    placeholder="Enter job salary informations"
                    name="salary_informations"
                    value={formData.salary_informations}
                    onChange={handleInputChange}
                    className="input-style" required
                  />
                  {errors.salary_informations && <Typography variant="small" color="red">{errors.salary_informations}</Typography>}
                </div>
              </div>
              {/* Add input fields for other attributes as needed */}
              <Button type="submit" className="mt-6 bg-red-800" fullWidth>
                Create Job Offer
              </Button>
            </form>
          </Card>
         
        </div>
      </section>
    </>
  );
}

export default Job_offer;