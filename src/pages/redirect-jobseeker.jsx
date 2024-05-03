import React from "react";
import application from "/public/img/applications.jpg";
import joboffer from "/public/img/posting job offer.jpeg";
import quiz from "/public/img/take quiz.png"
import joboffer2 from "/public/img/browse.jpeg"

import 'react-day-picker/dist/style.css';
import { useNavigate } from "react-router-dom";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Footer, Navbar1, Navbarjs } from '@/widgets/layout';
import { Navbar } from "@/widgets/layout";
import schedule from "/public/img/schedule.png";
export function RedirectJobSeeker() {
  const navigate = useNavigate(); 
  const userId = localStorage.getItem('userId');
   const  handleClick2 = () => {
    navigate("/job_offers");
  };
  const handleClick1 = () => {
    navigate("/quizss");
  };
  const handleClick3 = () => {
    navigate("/applications");
  };

  const handleClick4 = () => {
    navigate(`/CalendarJS/${userId}`);
  };
  return (
    <>
          <Navbarjs/>

    <div className='w-full py-[1rem] px-4  justify-content-center  '>
      <div className="w-full py-[10rem] px-4 ">
        <div className="max-w-[1240px] mx-auto grid md:grid-cols-4 gap-8">
        <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300 ml-5 mt-10 '>
            <img className="w-20 mx-auto mt-[-1rem] bg-white" src={quiz} alt="/" />
            <h2 className="Lato text-[#2b2b2b] text-2xl text-center py-8">Take a Quiz on Opportunify!</h2>
            <div className="text-center font-medium">
              <p className="py-2 border-b mx-8 mt-8">Read each question carefully before selecting an answer.</p>
              <p className="py-2 border-b mx-8 mt-8">Answer all the questions to the best of your ability</p>
              <p className="py-2 border-b mx-8 mt-8">Click the "Submit" button when you have finished.</p>
            </div>
          
            <button onClick={handleClick1} className='  w-[200px] rounded-md font-medium bg-red-800 my-6 mx-auto px-6 py-3 text-white'>Take a quiz</button>

          </div>

          <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300 ml-10 mt-10'>
            <img className="w-20 mx-auto mt-[-3rem] bg-transparent" src={joboffer2} alt="/" />
            <h2 className="Lato text-[#2b2b2b] text-2xl text-center py-8">Available Job Offers</h2>
            <div className="text-center font-medium">
              <p className="Lato py-2 border-b mx-8 mt-8">Browse through a variety of consulting job offers on Opportunify</p>
              <p className="Lato py-2 border-b mx-8 mt-8">Discover opportunities to work with top companies and organizations.</p>
              <p className="Lato py-2 border-b mx-8 mt-8"> Explore different roles and industries within the consulting field..</p>
            </div>
            <button onClick={handleClick2}className="Lato bg-black text-white w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3">Available Job Offers</button>
          </div>

          <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300 ml-10 mt-10'>
            <img className="w-20 mx-auto mt-[-1rem] bg-transparent" src={application} alt="/" />
            <h2 className="Lato text-[#2b2b2b] text-2xl text-center py-8">Check My Applications</h2>
            <div className="text-center font-medium">
              <p className="Lato py-2 border-b mx-8 mt-8">Track the status of your job applications to stay updated on your progress throughout the hiring process. 
</p>
              <p className="Lato py-2 border-b mx-8 mt-8">Stay updated on your progress in the hiring process</p>
              <p className="Lato py-2 border-b mx-8 mt-8"> Access feedback and notifications regarding your applications </p>
            </div>
            <button onClick={handleClick3}className="Lato bg-[#555555] text-white w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3">My applications</button>
          </div>
          <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300 ml-10 mt-10'>
            <img className="w-20 mx-auto mt-[-1rem] bg-transparent" src={schedule } alt="/" />
            <h2 className="Lato text-[#2b2b2b] text-2xl text-center py-8">Check My Calendar</h2>
            <div className="text-center font-medium">
              <p className="Lato py-2 border-b mx-8 mt-8">Unlock Your Future Opportunities: Explore Your Personalized Interview Calendar Today! 
</p>
              <p className="Lato py-2 border-b mx-8 mt-8">Maximize Your Job Search Efficiency: Keep Track of Your Interview Appointments with Ease</p>
              <p className="Lato py-2 border-b mx-8 mt-8"> Stay Ahead in Your Job Search: Take Control of Your Interview Calendar for Greater Success </p>
            </div>
            <button onClick={handleClick4}className="Lato bg-[#555555] text-white w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3">My calendar</button>
          </div>
        </div>
      </div>

      
    </div>
    <Footer/>

    </>

    
  );
}

export default RedirectJobSeeker;