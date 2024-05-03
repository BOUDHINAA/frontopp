import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Input, Button, Typography } from "@material-tailwind/react";
import Navbar from "@/widgets/layout/navbar";

export function Job_offerUpdate() {
  const { id } = useParams();

  const [formData, setFormData] = useState({
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
          if (value.trim() === "") {
            setErrors((prevErrors) => ({
              ...prevErrors,
              description: "Description cannot be empty",
            }));
          } else {
            setErrors((prevErrors) => ({
              ...prevErrors,
              description: value.length >= 10 ? "" : "Description must be at least 10 characters long",
            }));
          }
          break;
          case "qualifications":
            if (value.trim() === "") {
              setErrors((prevErrors) => ({
                ...prevErrors,
                qualifications: "Qualifications cannot be empty",
              }));
            } else {
              setErrors((prevErrors) => ({
                ...prevErrors,
                qualifications: value.length >= 8 ? "" : "Qualifications must be at least 8 characters long",
              }));
            }
            break;
          
        case "responsibilities":
      if (value.trim() === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          responsibilities: "Responsibilities cannot be empty",
        }));
      } else {
        const responsibilitiesRegex = /^[a-zA-Z\s]+$/;
        setErrors((prevErrors) => ({
          ...prevErrors,
          responsibilities: responsibilitiesRegex.test(value) ? "" : "Responsibilities must contain only alphabetical characters",
        }));
      }
      break;
      case "langue":
        if (value.trim() === "") {
          setErrors((prevErrors) => ({
            ...prevErrors,
            langue: "Language cannot be empty",
          }));
        } else {
          const langueRegex = /^[a-zA-Z]+$/;
          setErrors((prevErrors) => ({
            ...prevErrors,
            langue: langueRegex.test(value) ? "" : "Language must contain only alphabetical characters",
          }));
        }
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

  useEffect(() => {
    const fetchJobOffer = async () => {
      try {
        const response = await axios.get(`/job_offer/get/${id}`);
        const { title, description, qualifications, responsibilities, lieu, langue, workplace_type, field, salary_informations, deadline } = response.data;
        setFormData({ title, description, qualifications, responsibilities, lieu, langue, workplace_type, field, salary_informations, deadline });
      } catch (error) {
        console.error("Failed to fetch job offer:", error.response ? error.response.data : error.message);
      }
    };

    fetchJobOffer();
  }, [id]);

  const handleUpdate = async () => {
    // Check if there are any errors
    const hasErrors = Object.values(errors).some((error) => error);
    if (hasErrors) {
      // If there are errors, prevent the update
      window.alert("Please fix all errors before updating.");
      return;
    }

    try {
      const response = await axios.put(`/job_offer/update/${id}`, formData);
      console.log("Job offer updated:", response.data);
      // Redirect to the job offer consultation page after the update
      window.location.href = "/Job_offerConsult";
    } catch (error) {
      console.error("Failed to update job offer:", error.response ? error.response.data : error.message);
      // Display an alert in case of error
      window.alert("Failed to update job offer");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    // Validate the input whenever it changes
    validateInput(name, value);
  };

  return (
    <>
      <Navbar />
      <div className="container relative mx-auto">
        <div className="relative flex content-center justify-center pt-24 pb-8"></div>
      </div>

      <div className="container mx-auto p-4">
        <h1 className="text-2xl text-white font-bold mb-4 bg-red-800 px-4 py-4 rounded-lg">Update Job Offer</h1>
        <div className="grid grid-cols-2 gap-4 bg-gray-100 p-4">
          <div>
            <Typography variant="small" color="blue-gray" className="mb-1 mt-1 font-medium">
              Title
            </Typography>
            <Input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
            {errors.title && <Typography variant="small" color="red">{errors.title}</Typography>}
            <Typography variant="small" color="blue-gray" className="mb-1 mt-1 font-medium">
              Description
            </Typography>
            <Input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
            {errors.description && <Typography variant="small" color="red">{errors.description}</Typography>}
            <Typography variant="small" color="blue-gray" className="mb-1 mt-1 font-medium">
              Qualifications
            </Typography>
            <Input type="text" name="qualifications" value={formData.qualifications} onChange={handleChange} placeholder="Qualifications" />
            {errors.qualifications && <Typography variant="small" color="red">{errors.qualifications}</Typography>}
            <Typography variant="small" color="blue-gray" className="mb-1 mt-1 font-medium">
              Responsibilities
            </Typography>
            <Input type="text" name="responsibilities" value={formData.responsibilities} onChange={handleChange} placeholder="Responsibilities" />
            {errors.responsibilities && <Typography variant="small" color="red">{errors.responsibilities}</Typography>}
            <Typography variant="small" color="blue-gray" className="mb-1 mt-1 font-medium">
              Language
            </Typography>
            <Input type="text" name="langue" value={formData.langue} onChange={handleChange} placeholder="Language" />
            {errors.langue && <Typography variant="small" color="red">{errors.langue}</Typography>}
          </div>
          <div>
            <Typography variant="small" color="blue-gray" className="mb-1 mt-1 font-medium">
              Workplace Type
            </Typography>
            <select
              id="workplace_type"
              name="workplace_type"
              value={formData.workplace_type}
              onChange={handleChange}
              className="block w-full bg-gray-100 border border-gray-400 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 py-2"
            >
              <option value="">Select workplace type</option>
              <option value="Remote">Remote</option>
              <option value="On-site">On-site</option>
              <option value="Hybrid">Hybrid</option>
            </select>
            {errors.workplace_type && <Typography variant="small" color="red">{errors.workplace_type}</Typography>}
            <Typography variant="small" color="blue-gray" className="mb-1 mt-1 font-medium">
              Field
            </Typography>
            <Input type="text" name="field" value={formData.field} onChange={handleChange} placeholder="Field" />
            {errors.field && <Typography variant="small" color="red">{errors.field}</Typography>}
            <Typography variant="small" color="blue-gray" className="mb-1 mt-1 font-medium">
              Salary Informations
            </Typography>
            <Input type="text" name="salary_informations" value={formData.salary_informations} onChange={handleChange} placeholder="Salary Informations" />
            {errors.salary_informations && <Typography variant="small" color="red">{errors.salary_informations}</Typography>}
            <Typography variant="small" color="blue-gray" className="mb-1 mt-1 font-medium">
              Deadline
            </Typography>
            <Input type="date" name="deadline" value={formData.deadline} onChange={handleChange} placeholder="Deadline" />
            {errors.deadline && <Typography variant="small" color="red">{errors.deadline}</Typography>}
          </div>
        </div>
        <div className=" mt-8">
  <Button onClick={() => window.location.href = "/Job_offerConsult"} className="mr-4 bg-gray-700 flex justify-start">Want to get back?</Button>
  <div className="flex justify-center">
    <Button onClick={handleUpdate} className="w-60 bg-red-800 flex justify-center">Update</Button>
  </div>
</div>

      </div>
    </>
  );
}
export default Job_offerUpdate;
