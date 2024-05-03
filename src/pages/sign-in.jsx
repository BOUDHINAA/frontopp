
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
    role: "",
  }); const [errors, setErrors] = useState({
    email: "",
    password: "",
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
          <form onSubmit={loginUser} className="space-y-4">
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
                  onChange={(e) =>
                    setData({ ...data, email: e.target.value })
                  }
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
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
                  {errors.password && (
                  <Typography variant="small" color="red">
                    {errors.password}
                  </Typography>
                )}
              </div>
              <Button type="submit" className="mt-6 bg-red-800" fullWidth>
                Sign In
              </Button>
            </form>

            <div className="flex items-center justify-between gap-2 mt-6">
                <Typography variant="small" className="font-medium text-gray-900">
                  <Link to="/Forgot">Forgot Password?</Link>
                </Typography>
              </div>{/*
          <div className="space-y-4 mt-8">
            <Button size="lg" color="white" className="flex items-center gap-2 justify-center shadow-md" fullWidth>
              <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1156_824)">
                  <path d="M16.3442 8.18429C16.3442 7.64047 16.3001 7.09371 16.206 6.55872H8.66016V9.63937H12.9813C12.802 10.6329 12.2258 11.5119 11.3822 12.0704V14.0693H13.9602C15.4741 12.6759 16.3442 10.6182 16.3442 8.18429Z" fill="#4285F4" />
                  <path d="M8.65974 16.0006C10.8174 16.0006 12.637 15.2922 13.9627 14.0693L11.3847 12.0704C10.6675 12.5584 9.7415 12.8347 8.66268 12.8347C6.5756 12.8347 4.80598 11.4266 4.17104 9.53357H1.51074V11.5942C2.86882 14.2956 5.63494 16.0006 8.65974 16.0006Z" fill="#34A853" />
                  <path d="M4.16852 9.53356C3.83341 8.53999 3.83341 7.46411 4.16852 6.47054V4.40991H1.51116C0.376489 6.67043 0.376489 9.33367 1.51116 11.5942L4.16852 9.53356Z" fill="#FBBC04" />
                  <path d="M8.65974 3.16644C9.80029 3.1488 10.9026 3.57798 11.7286 4.36578L14.0127 2.08174C12.5664 0.72367 10.6469 -0.0229773 8.65974 0.000539111C5.63494 0.000539111 2.86882 1.70548 1.51074 4.40987L4.1681 6.4705C4.8001 4.57449 6.57266 3.16644 8.65974 3.16644Z" fill="#EA4335" />
                </g>
                <defs>
                  <clipPath id="clip0_1156_824">
                    <rect width="16" height="16" fill="white" transform="translate(0.5)" />
                  </clipPath>
                </defs>
              </svg>
              <span>Sign in With Google</span>
            </Button>
            <Button size="lg" color="white" className="flex items-center gap-2 justify-center shadow-md" fullWidth>
              <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1156_824)">
                  <path d="M16.3442 8.18429C16.3442 7.64047 16.3001 7.09371 16.206 6.55872H8.66016V9.63937H12.9813C12.802 10.6329 12.2258 11.5119 11.3822 12.0704V14.0693H13.9602C15.4741 12.6759 16.3442 10.6182 16.3442 8.18429Z" fill="#4285F4" />
                  <path d="M8.65974 16.0006C10.8174 16.0006 12.637 15.2922 13.9627 14.0693L11.3847 12.0704C10.6675 12.5584 9.7415 12.8347 8.66268 12.8347C6.5756 12.8347 4.80598 11.4266 4.17104 9.53357H1.51074V11.5942C2.86882 14.2956 5.63494 16.0006 8.65974 16.0006Z" fill="#34A853" />
                  <path d="M4.16852 9.53356C3.83341 8.53999 3.83341 7.46411 4.16852 6.47054V4.40991H1.51116C0.376489 6.67043 0.376489 9.33367 1.51116 11.5942L4.16852 9.53356Z" fill="#FBBC04" />
                  <path d="M8.65974 3.16644C9.80029 3.1488 10.9026 3.57798 11.7286 4.36578L14.0127 2.08174C12.5664 0.72367 10.6469 -0.0229773 8.65974 0.000539111C5.63494 0.000539111 2.86882 1.70548 1.51074 4.40987L4.1681 6.4705C4.8001 4.57449 6.57266 3.16644 8.65974 3.16644Z" fill="#EA4335" />
                </g>
                <defs>
                  <clipPath id="clip0_1156_824">
                    <rect width="16" height="16" fill="white" transform="translate(0.5)" />
                  </clipPath>
                </defs>
              </svg>
              <span>Sign in With Facebook</span>
            </Button>
            <Button size="lg" color="white" className="flex items-center gap-2 justify-center shadow-md" fullWidth>
              <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1156_824)">
                  <path d="M16.3442 8.18429C16.3442 7.64047 16.3001 7.09371 16.206 6.55872H8.66016V9.63937H12.9813C12.802 10.6329 12.2258 11.5119 11.3822 12.0704V14.0693H13.9602C15.4741 12.6759 16.3442 10.6182 16.3442 8.18429Z" fill="#4285F4" />
                  <path d="M8.65974 16.0006C10.8174 16.0006 12.637 15.2922 13.9627 14.0693L11.3847 12.0704C10.6675 12.5584 9.7415 12.8347 8.66268 12.8347C6.5756 12.8347 4.80598 11.4266 4.17104 9.53357H1.51074V11.5942C2.86882 14.2956 5.63494 16.0006 8.65974 16.0006Z" fill="#34A853" />
                  <path d="M4.16852 9.53356C3.83341 8.53999 3.83341 7.46411 4.16852 6.47054V4.40991H1.51116C0.376489 6.67043 0.376489 9.33367 1.51116 11.5942L4.16852 9.53356Z" fill="#FBBC04" />
                  <path d="M8.65974 3.16644C9.80029 3.1488 10.9026 3.57798 11.7286 4.36578L14.0127 2.08174C12.5664 0.72367 10.6469 -0.0229773 8.65974 0.000539111C5.63494 0.000539111 2.86882 1.70548 1.51074 4.40987L4.1681 6.4705C4.8001 4.57449 6.57266 3.16644 8.65974 3.16644Z" fill="#EA4335" />
                </g>
                <defs>
                  <clipPath id="clip0_1156_824">
                    <rect width="16" height="16" fill="white" transform="translate(0.5)" />
                  </clipPath>
                </defs>
              </svg>
              <span>Sign in With Twitter</span>
            </Button>
            
            <Button onClick={handleFacebookLogin}>Se connecter avec Facebook</Button>

            <Button size="lg" color="white" className="flex items-center gap-2 justify-center shadow-md" fullWidth>
              <img src="/img/twitter-logo.svg" height={24} width={24} alt="" />
              <span>Sign in With Twitter</span>
                  </Button>
          </div>*/}

            <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
              Not registered?
              <Link to="/sign-up" className="text-gray-900 ml-1">Create an account.</Link>
            </Typography>
          </Card>
        </div>
      
      </section>
    
    <Footer/>
    </>
  );
}

export default SignIn;
