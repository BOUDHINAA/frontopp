import React from "react";
import applicationlist from "/public/img/app list.webp";
import joboffer from "/public/img/posting job offer.jpeg";
import 'react-day-picker/dist/style.css';
import { useNavigate } from "react-router-dom";
import company from "./company.png";
import jobseeker from "./jobseeker.png";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import Navbar0 from "@/widgets/layout/navbar0";
import Footer from "@/widgets/layout/footer";

import { Navbar1 } from "@/widgets/layout";


export function RedirectSignUp() {
  const navigate = useNavigate(); 
   const handleClick1 = () => {
    navigate("/sign-upjs");
  };
  const handleClick2 = () => {
    navigate("/sign-up");
  };

 
  return (
    <>


    <Navbar1/>


    <div className='w-full py-[10rem] px-4  justify-content-center ml-70'>

      <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8 ml-80'>
          <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300 ml-40 mt-10'>
              <img className='  w-20 mx-auto mt-[-3rem] bg-white' src={jobseeker} alt="/" />
              <h2 className=' Lato text-[#2b2b2b] text-2xl  text-center py-8'>JOB SEEKER</h2>
              <div className='text-center font-medium'>
                  <p className='py-2 border-b mx-8 mt-8'>Join a Platform Tailored for Your Professional Growth</p>
                  <p className='py-2 border-b mx-8 mt-8'>Find Your Dream Job and Apply with Ease</p>
                  

              </div>
              <button onClick={handleClick1} className='Lato bg-[#d63939] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 text-white'>Start now</button>
              </div>
              <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300 ml-40 mt-10'>
              <img className='  w-20 mx-auto mt-[-3rem] bg-transparent' src={company} alt="/" />
              <h2 className='Lato text-[#2b2b2b] text-2xl  text-center py-8'>COMPANY</h2>
              <div className='text-center font-medium'>
                  <p className='Lato py-2 border-b mx-8 mt-8'>Unlock a World of Talent for Your Company</p>
                  <p className='Lato py-2 border-b mx-8 mt-8'>Discover the Best Professionals for Your Team</p>
              
              </div>
              <button onClick={handleClick2} className='Lato bg-black text-white w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3'>Start now</button>
          </div>
         
          </div>
        
      </div>
      <Footer/>
      </>
  );
}

export default RedirectSignUp;
