import React from "react";
import applicationlist from "/public/img/app list.webp";
import joboffer from "/public/img/posting job offer.jpeg";
import joboffer2 from "/public/img/browse.jpeg"
import 'react-day-picker/dist/style.css';
import { useNavigate } from "react-router-dom";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Footer } from '@/widgets/layout';
import { Navbar } from "@/widgets/layout";
import schedule from "/public/img/schedule.png";
export function RedirectCompany() {
  const navigate = useNavigate(); 
  const pId = localStorage.getItem('pId');
   const handleClick1 = () => {
    navigate("/Job_offer");
  };
  const handleClick2 = () => {
    navigate("/evaluation");
  };
  const handleClick3 = () => {
    navigate("/Job_offerConsult");
  };
  const handleClick4 = () => {
    navigate(`/Calendar/${pId}`);
  };
 
  return (
    <>
<Navbar/>  
    <div className='w-full py-[1rem] px-4  justify-content-center  '>
      <div className="w-full py-[10rem] px-4 ">
        <div className="max-w-[1240px] mx-auto grid md:grid-cols-4 gap-8">
        <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300 ml-5 mt-10 '>
            <img className="w-20 mx-auto mt-[-3rem] bg-white" src={joboffer} alt="/" />
            <h2 className="Lato text-[#2b2b2b] text-2xl text-center py-8">Post A New Job offer on Opportunify!</h2>
            <div className="text-center font-medium">
              <p className="py-2 border-b mx-8 mt-8">Ready to find your next star employee?</p>
              <p className="py-2 border-b mx-8 mt-8">Unlock a World of Talent for Your Company</p>
              <p className="py-2 border-b mx-8 mt-8">Discover the Best Professionals for Your Team!</p>
            </div>
          
            <button onClick={handleClick1} className='  w-[200px] rounded-md font-medium bg-red-800 my-6 mx-auto px-6 py-3 text-white'>Post Job Offer</button>

          </div>

          <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300 ml-10 mt-10'>
            <img className="w-20 mx-auto mt-[-3rem] bg-transparent" src={applicationlist} alt="/" />
            <h2 className="Lato text-[#2b2b2b] text-2xl text-center py-8">Save your quiz and make it available to candidates</h2>
            <div className="text-center font-medium">
              <p className="Lato py-2 border-b mx-8 mt-8">Easily create your own quiz to assess candidates or test knowledge</p>
              <p className="Lato py-2 border-b mx-8 mt-8">Add questions and answer choices.</p>
              <p className="Lato py-2 border-b mx-8 mt-8"> Customize the quiz settings, such as time limit or scoring.</p>
            </div>
            <button onClick={handleClick2}className="Lato bg-black text-white w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3">Create a Quiz</button>
          </div>

          <div className="w-full shadow-xl  mr-60 ml-10 flex flex-col p-4 md:my-0 my-8 rounded-lg hover:scale-105 duration-300">
            <img className="w-20 mx-auto mt-[-3rem] bg-transparent" src={joboffer2} alt="/" />
            <h2 className="Lato text-[#2b2b2b] text-2xl text-center py-8">Browse my published job offers on Opportunify!</h2>
            <div className="text-center font-medium">
              <p className="Lato py-2 border-b mx-8 mt-8">Explore your repository of posted job offers crafted with precision </p>
              <p className="Lato py-2 border-b mx-8 mt-8">Delve into your collection of published job offers, each representing an opportunity for us to attract top-tier talent to join our team</p>
              <p className="Lato py-2 border-b mx-8 mt-8">  Job offers tailored to our company's needs and aspirations </p>
            </div>
            <button onClick={handleClick3}className="Lato bg-[#555555] text-white w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3">Check my offers</button>
        
          </div>
          <div className="w-full shadow-xl  mr-60 ml-10 flex flex-col p-4 md:my-0 my-8 rounded-lg hover:scale-105 duration-300">
            <img className="w-20 mx-auto mt-[-1rem] bg-transparent" src={schedule} alt="/" />
            <h2 className="Lato text-[#2b2b2b] text-2xl text-center py-8">Check my scheduled interviews</h2>
            <div className="text-center font-medium">
              <p className="Lato py-2 border-b mx-8 mt-8">in order to Stay Informed on Interview Schedules </p>
              <p className="Lato py-2 border-b mx-8 mt-8">Empower Your Hiring Journey and Find the Perfect Fit for Your Team with Our Advanced Interview Calendar</p>
              <p className="Lato py-2 border-b mx-8 mt-8"> "Dive into Your Interview Agenda: Your Gateway to Exceptional Talent and Seamless Recruitment </p>
            </div>
            <button onClick={handleClick4}className="Lato bg-[#555555] text-white w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3">Check my calendar</button>
        
          </div>
        </div>
     
      
      </div>
    </div>
    <Footer/>

    </>

    
  );
}

export default RedirectCompany;