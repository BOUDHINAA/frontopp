
import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import "react-toastify/dist/ReactToastify.css";
import { Footer, Navbar1 } from "@/widgets/layout";
export function SignIn() {
  const Navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
    role: ""
  }); 
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });


  ////////errors mtaa el code
  const [errorsCode, setErrorsCode] = useState({
    email: "",
    password: "",
    mfacode: ""
  });
  ////data in case sign in bl code
  const [data1, setData1] = useState({
    email: "",
    password: "",
    mfacode: ""
  }); 
  const validateForm = () => {
    let valid = true;
    const errorsCopy = { ...errors };

    if (!data.email) {
      errorsCopy.email = "Email is required";
      valid = false;
    } else {
      errorsCopy.email = "";
    }

    if (!data.password) {
      errorsCopy.password = "Password is required";
      valid = false;
    } else {
      errorsCopy.password = "";
    }

    setErrors(errorsCopy);
    return valid;
  };
  //////validate form mmta sign bl code

  const validateFormCode = () => {
    let valid = true;
    const errorsCopy = { ...errorsCode };
    if (!data1.mfacode) {
      errorsCopy.mfacode = "MFA code is required";
      valid = false;
    } else {
      errorsCopy.mfacode = "";
    }
    ///
    if (!data1.email) {
      errorsCopy.email = "Email is required";
      valid = false;
    } else {
      errorsCopy.email = "";
    }

    if (!data1.password) {
      errorsCopy.password = "Password is required";
      valid = false;
    } else {
      errorsCopy.password = "";
    }
    
    setErrorsCode(errorsCopy);
    return valid;
  };
  
  const loginUser = async (e) => {
    if (validateForm()) {
    e.preventDefault();
    try {
      const response = await axios.post('/user/login', data);
      
      // Extract the access token from the response
      const accessToken = response.data.accessToken;

      // Store the access token securely
      localStorage.setItem('accessToken', accessToken);
      // Assuming successful registration, you can redirect the user or display a success message
      console.log('Authentification successful:', response.data);
      console.log('Authentication successful:', response.data);

      // Extract user role from response
      const userRole = response.data.user.role;
   //  const userId =response.data.jobSeekerId;
     const userId =response.data.profileId;
     const pId=response.data.company_profileId;
      // Store user role in session storage
      // Store pId in localStorage
     // Extract user role and pId from response      
     // Store pId in local storage
     localStorage.setItem('pId', pId);
    localStorage.setItem('userId', userId);
// Store userId in session storage
//sessionStorage.setItem('userId', userId);

      setUserRole(userRole);

      // Redirect based on user role
      if (userRole === 'admin') {
        Navigate("/dashboard");

      } else if (userRole === 'company') {
       Navigate(`/redirect-company`);

      } else if (userRole === 'job_seeker') {
        Navigate(`/redirect-job-seeker`);    
        }
        
    } catch (error) {
      console.error('Email or password is wrong', error.response.data);
      if (error.response.status === 429) {
        // Display too many login attempts notification
        toast.error('Too many login attempts, please try again later.');
      } else if (error.response.status === 401) {
        // Display email or password wrong notification
        toast.error('Email or password is incorrect.');

      } else if (error.response?.status === 403) {
        toast.error("User is rejected and cannot log in"); // Stocker le message d'erreur spécifique
      }  else if (error.response?.status === 404) {
        toast.error("User is blocked"); // Stocker le message d'erreur spécifique
      } 
      
      
      
      
      else {
        // Display generic authentication failed notification
        toast.error('Email or password is wrong');
      }
    }}
  };
  const handleFacebookLogin = async () => {
    try {
      // Faire une requête POST vers l'endpoint d'authentification Facebook de votre backend
      const response = await axios.get('/auth/facebook');
      // Gérer la réponse en fonction de votre logique métier (redirection, mise à jour de l'état, etc.)
      console.log('Réponse de l\'authentification Facebook:', response.data);
    } catch (error) {
      // Gérer les erreurs potentielles ici
      console.error('Erreur lors de l\'authentification Facebook:', error);
    }
  };

  // Function to set user role in session storage
  function setUserRole(userRole) {
    sessionStorage.setItem('userRole', userRole);
  }
  
  ////////////////ssss
  
  
  const [showMFAInput, setShowMFAInput] = useState(false);

  const loginUserMFA = async (e) => {
    if (validateForm()) {
      console.log("loginUserMFA function called");

    e.preventDefault();
    try {
      const response = await axios.post('/MFA/send-mfacode', data);
      toast.success('You have recieved your verification Code .Check your email');
      console.log('code sent', response.data.mfacode);
      setShowMFAInput(true);

    } catch (error) {
      console.error('Email or password is wrong', error.response.data);
      if (error.response.status === 429) {
        toast.error('Too many login attempts, please try again later.');
      } else if (error.response.status === 401) {
        toast.error('Email or password is incorrect.');

      } else if (error.response?.status === 403) {
        toast.error("User is rejected and cannot log in"); 
      }  else if (error.response?.status === 404) {
        toast.error("User is blocked"); 
      } 
      else {
        toast.error('Email or password is wrong');
      }
    }}
  };
  //////////wakt nokres ala verify code and proceed with sign up
  const VerifyCodeAndSignUp = async (e) => {

    if (validateFormCode()) {

    e.preventDefault();
    try {

      console.log("Data being sent:", data1); // Log the data being sent
     

      const response = await axios.post('/MFA/login-with-mfa', data1) 

      const accessToken = response.data.accessToken;

      localStorage.setItem('accessToken', accessToken);
      console.log('Authentification successful:', response.data);

      const userRole = response.data.user.role;
     const userId =response.data.profileId;
     const pId=response.data.company_profileId;
   
     localStorage.setItem('pId', pId);
    localStorage.setItem('userId', userId);


      setUserRole(userRole);

      // Redirect based on user role
      if (userRole === 'admin') {
        Navigate("/dashboard");

      } else if (userRole === 'company') {
       Navigate(`/redirect-company`);

      } else if (userRole === 'job_seeker') {
        Navigate(`/redirect-job-seeker`);    
        }
        
    } catch (error) {
      console.error('Error', error.response.data);

      if (error.response.status === 429) {
        toast.error('Too many login attempts, please try again later.');
      } else if (error.response.status === 401) {
        toast.error('Email or password is incorrect.');

      } else if (error.response?.status === 403) {
        toast.error("User is rejected and cannot log in"); 
      }  else if (error.response?.status === 404) {
        toast.error("User is blocked"); 
      } 
      
    }}
  };


  function setUserRole(userRole) {
    sessionStorage.setItem('userRole', userRole);
  }
  
  return (
    <>
           <ToastContainer position="top-center" autoClose={5000} />

    <Navbar1/>
      <section style={{ display: 'flex', justifyContent: 'center' }}className="ml-10 mr-10 mt-4 lg:mt-8 flex gap-4 items-center" >
        <div className="w-full lg:w-2/5">
          <div className="text-center">
            <Typography variant="h1" className="font-bold mb-4 text-red-800">Sign In</Typography>
            <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to Login to Opportunify.</Typography>
          </div>
          <Card className="mt-8 ml-auto mr-auto mb-2 w-80 max-w-screen-lg lg:w-5/6 rounded-lg p-6 bg-gray-200 bg-opacity-90">
          <form className="space-y-4">
              <div className="flex flex-col gap-6">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="-mb-3 font-medium"
                >
                  Your email
                </Typography>
                <Input
                  size="lg"
                  type="email"
                  placeholder="name@mail.com"
                  value={data.email}

                  onChange={(e) => {
                    const emailValue = e.target.value;
                    setData({ ...data, email: emailValue });
                    setData1({ ...data1, email: emailValue });
                  
  }}
                />
                 {errors.email && (
                  <Typography variant="small" color="red">
                    {errors.email}
                  </Typography>
                )}
              </div>
              <div className="flex flex-col gap-6">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="-mb-3 font-medium"
                >
                  Password
                </Typography>
                <Input
                  size="lg"
                  type="password"
                  placeholder="************"
                  value={data.password}
                   onChange={(e) => {
                    const passwordValue = e.target.value;
                    setData({ ...data, password: passwordValue });
                    setData1({ ...data1, password: passwordValue });
                  
  }}
                />
                  {errors.password && (
                  <Typography variant="small" color="red">
                    {errors.password}
                  </Typography>
                )}
              </div>
              <Button type="submit" onClick={loginUser} className="mt-6 bg-red-800" fullWidth>
                Sign In
              </Button>
              <Button type="submit"  onClick={loginUserMFA} className="mt-6 bg-gray-700" fullWidth>
              Sign In with Email Verification
              </Button>
              {showMFAInput && (
        <div className="flex flex-col gap-6">
          <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
            Enter verification code
          </Typography>
          <Input
            size="lg"
            type="text"
            placeholder="Enter MFA Code"
            maxLength={6}
            value={data.mfacode}
            onChange={(e) =>
              {const mfacodeValue = e.target.value;
                console.log("MFA Code input value:", mfacodeValue);
              setData1({ ...data1, mfacode: mfacodeValue })
            }}
            
          />
          {errorsCode.mfacode && (
            <Typography variant="small" color="red">
              {errorsCode.mfacode}
            </Typography>
          )}
           
          <Button type="button"  onClick={VerifyCodeAndSignUp}className="mt-6 bg-green-800" fullWidth>
                Verify Code to Proceed
              </Button>
          
        </div>
      )}
      

            </form>

            <div className="flex items-center justify-between gap-2 mt-6">
                <Typography variant="small" className="font-medium text-gray-900">
                  <Link to="/Forgot">Forgot Password?</Link>
                </Typography>
              </div>

            <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
              Not registered?
              <Link to="/redirect-sign-up" className="text-gray-900 ml-1">Create an account.</Link>
            </Typography>
          </Card>
        </div>
      
      </section>
    
    <Footer/>
    </>
  );
}

export default SignIn;
