import React from 'react';
import {
  FaDribbbleSquare,
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaTwitterSquare,
} from 'react-icons/fa';
import thin from './thin.png'
const Footer = () => {
  return (


    <div className='max-w-[1240px] mx-auto  px-4 grid lg:grid-cols-3 gap-8 text-[#494369]'>
      <div>
       
        <div className='flex justify-between md:w-[75%] my-6'>
            <FaFacebookSquare size={30} />
            <FaInstagram size={30} />
            <FaTwitterSquare size={30} />
            <FaGithubSquare size={30} />
         
           
        </div>
      </div>
      <div>
     <h1>Copyright © 2024  Professional Opportunities Management Platform-developed by : Developers </h1>
     </div>
      </div>
    
  
  );
};

export default Footer;
