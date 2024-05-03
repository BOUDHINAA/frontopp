import React, { useState } from 'react';

const TermsAndConditions = ({ isOpen, onClose }) => {
  const [showAllTerms, setShowAllTerms] = useState(false);

  if (!isOpen) return null;


  const terms = [
    {
      title: "User Accounts",
      content: "Users are required to create an account to access the features of the platform. Users are responsible for maintaining the confidentiality of their account credentials and for all activities that occur under their account."
    },
    {
      title: "Posting Opportunities",
      content: "Companies may post job and internship opportunities on the platform, providing accurate and up-to-date information about the positions. Opportunify reserves the right to review and approve all posted opportunities before they are made available to job seekers."
    },
    {
        title: "Candidate Selection:",
        content: "Companies have the sole discretion to review applications and select candidates based on their own criteria.Opportunify does not influence or interfere with the selection process conducted by companies."
      },
      {
        title: "Applying for Opportunities:",
        content:
         "Job seekers may browse and apply for opportunities listed on the platform, adhering to any specified requirements or qualifications.Opportunify does not guarantee employment and is not responsible for the outcome of any application."
      },
      {
        title: "Acceptance and Rejection:",
        content:"Companies may accept or reject candidates at their discretion.Opportunify does not participate in the decision-making process and is not liable for any decisions made by companies."
      },

      {
        title: "User Conduct:",
        content:" Users agree to use the platform in compliance with all applicable laws and regulations.Discriminatory, harassing, or illegal activities are strictly prohibited.Opportunify reserves the right to suspend or terminate accounts that violate these terms and conditions."
      },

      {
        title: "Intellectual Property:",
        content:"Users retain ownership of their own content posted on the platform.By posting content on Opportunify, users grant the platform a non-exclusive license to display and distribute the content."
      },

      {
        title: "Privacy Policy:",
        content:"Our Privacy Policy governs the collection, use, and disclosure of user data on the platform.Users are encouraged to review the Privacy Policy to understand how their personal information is handled."
      },
 
      {
        title: " Liability and Disclaimers:",
        content:"Opportunify is not liable for any damages or losses incurred by users in connection with the use of the platform.We do not guarantee the accuracy or quality of job listings, candidates, or interactions between users."
      },
      {
        title: "Modification and Termination:",
        content:"Opportunify reserves the right to update these terms and conditions at any time without prior notice.Users may terminate their account at any time by contacting customer support."
      },

      {
        title: "Governing Law and Dispute Resolution:",
        content:"These terms and conditions are governed by the laws of [Jurisdiction].Any disputes arising out of or related to these terms and conditions shall be resolved through arbitration in [Jurisdiction]."
      },
 
  ];

  const renderedTerms = showAllTerms ? terms : terms.slice(0, 5);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50 ">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full max-h-[80vh]">
        <h1 className="text-3xl font-bold text-center text-red-800 mb-6">Opportunify - Terms and Conditions</h1>
        <div className="bg-gray p-6 rounded shadow max-h-[50vh] overflow-y-auto">
          <ol className="list-decimal list-inside">
            {renderedTerms.map((term, index) => (
              <li key={index} className="mb-4">
                <strong>{term.title}</strong>
                <p>{term.content}</p>
              </li>
            ))}
          </ol>
        
          {!showAllTerms && (
            <button
              className="text-blue-500 underline"
              onClick={() => setShowAllTerms(true)}
            >
              Show More
            </button>
          )}
          <p className="mt-6">If you have any questions or concerns about these terms and conditions, please contact us at <a href="mailto:opportunify@outlook.com" className="text-blue-500">opportunify@outlook.com</a>.</p>
        </div>
        <br />
        <div className="flex justify-center">
          <button className="bg-gray-300 text-black-800 px-4 py-2 rounded" onClick={onClose}>Agree & Close</button>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
