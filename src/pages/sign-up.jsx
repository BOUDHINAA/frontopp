import React, { useState, useEffect } from 'react';

import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TermsAndConditions from './TermsAndConditions';
import { Footer } from '@/widgets/layout';
import PhoneInput from 'react-phone-input-2';


import { useNavigate } from "react-router-dom";
import {
  Input,
  Card,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Navbar1 } from '@/widgets/layout';



export function SignUp() {
  const [message, setMessage] = useState('');

  const [showMessage, setShowMessage] = useState(false); // State to control message visibility
  const [termsChecked, setTermsChecked] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setData({ ...data, image: file });
  };
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    matriculeFiscale: "",
    description: "",
    socialMedia: {
      facebook: "",
      twitter: "",
      linkedin: "",
    },
    address: "",
    phoneNumber: "",
    domainOfActivity: "",
    image: null, // Store the selected image file

  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    matriculeFiscale: "",
    description: "",
    domainOfActivity: "",
    socialMedia: {
      facebook: "",
      twitter: "",
      linkedin: "",
    },
    address: "",
    phoneNumber: "",
  });

  const [generalError, setGeneralError] = useState("");

  const registerJobseeker = async (e) => {
    e.preventDefault();

    let formIsValid = true;
    let newErrors = { ...errors };
      if (!formIsValid) {
        setErrors(newErrors);
        setGeneralError("Please fix the errors in the form.");

        // Faire défiler jusqu'au conteneur du formulaire en cas d'erreur
        const formContainer = document.querySelector('.form-container');
        formContainer.scrollIntoView({ behavior: 'smooth' });

        return;
    }
    // Validate name
    if (!data.name) {
      newErrors.name = "Please enter your name";
      formIsValid = false;
    }

    // Validate email
    if (!data.email) {
      newErrors.email = "Please enter your email";
      formIsValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        newErrors.email = "Invalid email format";
        formIsValid = false;
      }
    }

   // Validate password
if (!data.password) {
  newErrors.password = "Please enter your password";
  formIsValid = false;
} else if (data.password.length < 6) {
  newErrors.password = "Password must be at least 6 characters long";
  formIsValid = false;
} else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}/.test(data.password)) {
  newErrors.password = "Password should contain at least one lowercase letter, one uppercase letter, one digit, and one special character";
  formIsValid = false;
}

 // Validate matriculeFiscale
 if (!data.matriculeFiscale) {
  newErrors.matriculeFiscale = "Please enter your matricule fiscale";
  formIsValid = false;
}
 // Validate description
 if (!data.description) {
  newErrors.description = "Please enter a description";
  formIsValid = false;
} 



 // Validate domainOfActivity
 if (!data.domainOfActivity) {
  newErrors.domainOfActivity = "Please enter your domain of activity";
  formIsValid = false;
} else if (!/^[a-zA-Z]+$/.test(data.domainOfActivity)) {
  newErrors.domainOfActivity = "Domain of activity should contain only letters";
  formIsValid = false;
}


  // Validate address
  if (!data.address) {
    newErrors.address = "Please enter your address";
    formIsValid = false;
  }

// Validate Facebook
if (!data.socialMedia.facebook) {
  newErrors.socialMedia = {
    ...newErrors.socialMedia,
    facebook: "Please enter your Facebook profile link",
  };
  formIsValid = false;
} else {
  const facebookUrlRegex = /^https?:\/\/(www\.)?facebook\.com\/.*/;
  if (!facebookUrlRegex.test(data.socialMedia.facebook)) {
    newErrors.socialMedia = {
      ...newErrors.socialMedia,
      facebook: "Invalid Facebook profile link",
    };
    formIsValid = false;
  }
}

// Validate Twitter
if (!data.socialMedia.twitter) {
  newErrors.socialMedia = {
    ...newErrors.socialMedia,
    twitter: "Please enter your Twitter profile link",
  };
  formIsValid = false;
} else {
  const twitterUrlRegex = /^https?:\/\/(www\.)?twitter\.com\/.*/;
  if (!twitterUrlRegex.test(data.socialMedia.twitter)) {
    newErrors.socialMedia = {
      ...newErrors.socialMedia,
      twitter: "Invalid Twitter profile link",
    };
    formIsValid = false;
  }
}

// Validate LinkedIn
if (!data.socialMedia.linkedin) {
  newErrors.socialMedia = {
    ...newErrors.socialMedia,
    linkedin: "Please enter your LinkedIn profile link",
  };
  formIsValid = false;
} else {
  const linkedinUrlRegex = /^https?:\/\/(www\.)?linkedin\.com\/.*/;
  if (!linkedinUrlRegex.test(data.socialMedia.linkedin)) {
    newErrors.socialMedia = {
      ...newErrors.socialMedia,
      linkedin: "Invalid LinkedIn profile link",
    };
    formIsValid = false;
  }
}



  // Validate phoneNumber
if (!data.phoneNumber) {
  newErrors.phoneNumber = "Please enter your phone number";
  formIsValid = false;
} else if (!/^\d+$/.test(data.phoneNumber)) {
  newErrors.phoneNumber = "Phone number should contain only digits";
  formIsValid = false;
} else if (data.phoneNumber.length < 8 ){
  newErrors.phoneNumber = "Phone number should be at least 8 digits long";
  formIsValid = false;
} else if (data.phoneNumber.length > 12) {
  newErrors.phoneNumber = "Phone number should not exceed 12 digits";
  formIsValid = false;
}


 


    // Validate other fields as needed

    if (!formIsValid) {
      setErrors(newErrors);
      setGeneralError("Please fix the errors in the form.");
      return;
    }

 
 
 

    try {
      const adjustedData = {
        ...data,
        socialMedia: {
          ...data.socialMedia,
          // Add other social media fields as needed
        },
      };

      const response = await axios.post('/user/registerCompany', adjustedData);
      console.log('Registration successful:', response.data);
      navigate("/sign-in");
      setMessage(response.data.message);

    } catch (error) {
      setMessage(error.response.data.error);

      console.error('Registration failed:', error.response.data);
      setGeneralError("Registration failed. Please try again.");
    }
  };  useEffect(() => {
    // Show the message letters one by one with a delay
    const message = "Please Enter your information to register as a Company.";
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < message.length) {
        setShowMessage(prevMessage => prevMessage + message[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 500); // Adjust the delay between letters as needed

    // Cleanup function to clear the interval
    return () => clearInterval(interval);
  }, []);

  return (   <><Navbar1/>
    <div className="form-container  mb-40 ml-80 mb-10 mr-40">
  <div className="flex justif
  y-center items-center h-screen">
    <div className="w-full max-w-screen-lg">
      <div className="text-center ml-60  mt-60">
        <Typography variant="h2" className="font-bold text-red-800 mt-80  ">Join Us!</Typography>
        <div className={`text-center ${showMessage ? 'opacity-100 transition-opacity duration-500' : 'opacity-0'}`}>
          <Typography variant="paragraph" color="blue-gray" className="text-sm font-normal transition-opacity duration-500 ease-in">
            Please Enter your information to register as a Company.
          </Typography>
        </div>
      </div>

      <Card className=" rounded-lg p-1  bg-opacity-90 mt-10 ml-60 mb-10">
        <form onSubmit={registerJobseeker} className="mt-1 mb-0.5 mx-auto w-full max-w-screen-md flex flex-wrap justify-between form-container">
          {/* Form fields */}
          
            {/* Right Column - 5 Fields */}
            <div className="w-full md:w-1/2 mb-4">

            <div className="w-full md:w-1/2 mb-4">
              <div className="mb-1 flex flex-col gap-6">
              <div className="mb-1 flex flex-col gap-6">

              <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                Company Name
              </Typography>
            <Input
              size="lg"
              placeholder="Foulen"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={data.name}
              onChange={(e) => {
                setData({ ...data, name: e.target.value });
                setErrors({ ...errors, name: "" }); // Clear the error for name
              }}
            />
            {errors.name && <Typography variant="small" color="red">{errors.name}</Typography>}
          </div>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Company Email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={data.email}
              onChange={(e) => {
                setData({ ...data, email: e.target.value });
                setErrors({ ...errors, email: "" }); // Clear the error for name
              }}/>
            {errors.email && <Typography variant="small" color="red">{errors.email}</Typography>}
          </div>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Choose a password
            </Typography>
            <Input
              size="lg"
              placeholder="***"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={data.password}
              onChange={(e) => {
                setData({ ...data, password: e.target.value });
                setErrors({ ...errors, password: "" }); // Clear the error for name
              }}
              type='password'
            />
            {errors.password && <Typography variant="small" color="red">{errors.password}</Typography>}
          </div>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
            Company Tax Number            </Typography>
            <Input
              size="lg"
              placeholder="123456789"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={data.matriculeFiscale}
              onChange={(e) => {
                setData({ ...data, matriculeFiscale: e.target.value });
                setErrors({ ...errors, matriculeFiscale: "" }); // Clear the error for name
              }}
            />
            {errors.matriculeFiscale && <Typography variant="small" color="red">{errors.matriculeFiscale}</Typography>}
          </div>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
            Company Description
            </Typography>
            <Input
              size="lg"
              placeholder="Your description here..."
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={data.description}
              onChange={(e) => {
                setData({ ...data, description: e.target.value });
                setErrors({ ...errors, description: "" }); // Clear the error for name
              }}
            />
            {errors.description && <Typography variant="small" color="red">{errors.description}</Typography>}
          </div>

          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
               Domain of Activity
            </Typography>
            <Input
              size="lg"
              placeholder="IT, Marketing, etc."
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={data.domainOfActivity}
              onChange={(e) => {
                setData({ ...data, domainOfActivity: e.target.value });
                setErrors({ ...errors, domainOfActivity: "" }); // Clear the error for name
              }}
            />
            {errors.domainOfActivity && <Typography variant="small" color="red">{errors.domainOfActivity}</Typography>}
          </div>

            </div>
</div>
</div>

            <div className="mb-6"></div>





            {/* Right Column - 5 Fields */}
            <div className="w-full md:w-1/2 mb-4">

            <div className="w-full md:w-1/2 mb-4">
              <div className="mb-1 flex flex-col gap-6">
                {/* Add fields here */}
                
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Address
            </Typography>
            <Input
              size="lg"
              placeholder="Country, City, Street"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={data.address}
              onChange={(e) => {
                setData({ ...data, address: e.target.value });
                setErrors({ ...errors, address: "" }); // Clear the error for name
              }}
            />
            {errors.address && <Typography variant="small" color="red">{errors.address}</Typography>}
            
{/* Twitter */}
<div className="mb-1 flex flex-col gap-6">
  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
    Facebook
  </Typography>
  <Input
    size="lg"
    placeholder="Your Facebook profile link"
    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
    labelProps={{
      className: "before:content-none after:content-none",
    }} value={data.socialMedia.facebook}
    onChange={(e) => {
      setData({
        ...data,
        socialMedia: {
          ...data.socialMedia,
          facebook: e.target.value,
        },
      });setErrors({
        ...errors,
        socialMedia: { ...errors.socialMedia, facebook: "" }, // Clear the error for Facebook
      });
    }}
  />
  {errors.socialMedia && errors.socialMedia.facebook && <Typography variant="small" color="red">{errors.socialMedia.facebook}</Typography>}
</div>

<div className="mb-1 flex flex-col gap-6">
  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
    Twitter Link
  </Typography>
  <Input
    size="lg"
    placeholder="Your Twitter profile link"
    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
    labelProps={{
      className: "before:content-none after:content-none",
    }}
    value={data.socialMedia.twitter}
    onChange={(e) => {
      setData({
        ...data,
        socialMedia: {
          ...data.socialMedia,
          twitter: e.target.value,
        },
      });setErrors({
        ...errors,
        socialMedia: { ...errors.socialMedia, twitter: "" }, // Clear the error for Facebook
      });
    }}
  />
  {errors.socialMedia && errors.socialMedia.twitter && <Typography variant="small" color="red">{errors.socialMedia.twitter}</Typography>}
</div>
{/* LinkedIn */}
<div className="mb-1 flex flex-col gap-6">
  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
    LinkedIn Link
  </Typography>
  <Input
    size="lg"
    placeholder="Your LinkedIn profile link"
    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
    labelProps={{
      className: "before:content-none after:content-none",
    }}
    value={data.socialMedia.linkedin}
    onChange={(e) => {
      setData({
        ...data,
        socialMedia: {
          ...data.socialMedia,
          linkedin: e.target.value,
        },
      });setErrors({
        ...errors,
        socialMedia: { ...errors.socialMedia, linkedin: "" }, // Clear the error for Facebook
      });
    }}
  />
  {errors.socialMedia && errors.socialMedia.linkedin && <Typography variant="small" color="red">{errors.socialMedia.linkedin}</Typography>}
</div>

<div className="mb-1 flex flex-col gap-6">
                <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                  Your Phone Number
                </Typography>
                <PhoneInput
                  country={'TN'} 
                  placeholder="+216-12 345 6789"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  name='phone'
                 
                  value={data.phoneNumber}
                  onChange={(phoneNumber) => setData({ ...data, phoneNumber })}

                />
                {errors.phoneNumber && <Typography variant="small" color="red">{errors.phoneNumber}</Typography>}
              </div>


          </div>{/* Facebook */}
          <div className="w-full mb-4">
             
            </div>


            <div className="mb-1 flex flex-col gap-6">
        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
          </Typography>
  <label htmlFor="terms" className="flex items-center">
    <input
      type="checkbox"
      id="terms"
      checked={termsChecked}
      onChange={(e) => setTermsChecked(e.target.checked)}
      className="mr-2"
    />
   <Typography variant="small" color="blueGray">
        I accept{' '}
        <Link
          onClick={() => setIsConfirmationOpen(prevState => !prevState)}
          underline="always" 
          style={{ color: '#007bff' }} 
        >
          Opportunify terms and conditions
        </Link>
      </Typography>

  </label>
  <TermsAndConditions isOpen={isConfirmationOpen} onClose={() => setIsConfirmationOpen(false)} onConfirm={setIsConfirmationOpen}/>

</div>
{!termsChecked && (
  <Typography variant="small" color="red">
    Please accept Opportunify terms and conditions before registering.
  </Typography>
)}
              </div>
            </div>
            </div>

            {/* File Input */}
            
  
            {/* Button */}
            <div className="w-full">
              <Button className="mt-1 bg-red-800" fullWidth type="submit">
                Register Now
              </Button>
              {generalError && <Typography variant="small" color="red">{generalError}</Typography>}
  
              <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
                Already have an account? <Link to="/sign-in" className="text-gray-900 ml-1">Sign in</Link>
              </Typography>
            </div>
            </form>
            {message && <p>{message}</p>}

      </Card>
    </div>
  
    </div>

</div>
<Footer/>

</>
  );
  
}

export default SignUp; 