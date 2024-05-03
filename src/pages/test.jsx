import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Countdown from 'react-countdown';
import { useNavigate } from 'react-router-dom';
import { Navbarjs } from '@/widgets/layout';
import { GrLinkedin  , GrCertificate} from "react-icons/gr";
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

const Quiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [score, setScore] = useState(null);
  const [showLastQuestion, setShowLastQuestion] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/evaluations/quiz/${quizId}`);
        setQuiz(response.data);
        setAnswers(new Array(response.data.questions.length).fill(''));
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };

    fetchQuiz();
  }, [quizId]);

  const handleShare = () => {
    const url = window.location.href;
    const quizData = {
      title: 'Titre du quiz',
      description: 'Description du quiz',
    };
    const encodedQuizData = encodeURIComponent(JSON.stringify(quizData));
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&comment=${encodedQuizData}`);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft > 0 && showLastQuestion) {
        setTimeLeft(timeLeft - 1);
      } else {
        handleQuestionChange();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, showLastQuestion]);

  const handleAnswerChange = (index, optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[index] = optionIndex;
    setAnswers(newAnswers);
    handleQuestionChange();
  };

  const handleQuestionChange = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(15);
    } else {
      setShowLastQuestion(false);
      calculateScore();
    }
  };

  const calculateScore = () => {
    const totalQuestions = quiz.questions.length;
    let correctAnswers = 0;

    answers.forEach((answer, index) => {
      if (answer === quiz.questions[index].correctOptionIndex) {
        correctAnswers++;
      }
    });

    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    let observation = '';

    if (percentage >= 90) {
      observation = 'Excellent';
    } else if (percentage >= 70) {
      observation = 'Good';
    } else if (percentage >= 50) {
      observation = 'Average';
    } else {
      observation = 'Very Poor';
    }

    setScore({ percentage, observation });
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  let bgColorClass = '';
  let textColorClass = '';
  const getObservationMessage = (observation) => {
    switch (observation) {
      case 'Excellent':
        bgColorClass = 'bg-green-500';
        textColorClass = 'text-white';
        return 'Great job! You performed excellently in the quiz.';
      case 'Good':
        bgColorClass = 'bg-blue-500';
        textColorClass = 'text-white';
        return 'Well done! You did a good job in the quiz.';
      case 'Average':
        bgColorClass = 'bg-yellow-500';
        textColorClass = 'text-black';
        return 'Good effort! Your performance in the quiz was average.';
      case 'Very Poor':
        bgColorClass = 'bg-red-500';
        textColorClass = 'text-white';
        return 'Keep practicing! Your performance in the quiz was very poor.';
      default:
        return '';
    }
  };

  const generateCertificate = async () => {
    if (score && score.percentage > 80) {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([792, 612]); 
  
     
      page.drawRectangle({
        x: 0,
        y: 0,
        width: page.getWidth(),
        height: page.getHeight(),
        color: rgb(0.827, 0.827, 0.827), 
        borderColor: rgb(0.2, 0.2, 0.2), 
        borderWidth: 20, 
      });
  
      
      const titleFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      page.drawText('Certificate', {
        x: 100,
        y: page.getHeight() - 50,
        size: 36,
        font: titleFont,
        color: rgb(0, 0.149, 0.4), 
      });
  
     
      page.drawText(quiz.title, {
        x: 100,
        y: page.getHeight() - 150,
        size: 24,
        font: await pdfDoc.embedFont(StandardFonts.Helvetica),
        color: rgb(0.2, 0.2, 0.2), 
      });
  
      // Add observation
      const observationText = getObservationMessage(score.observation);
      page.drawText(`Observation: ${observationText}`, {
        x: 100,
        y: page.getHeight() - 250,
        size: 18,
        font: await pdfDoc.embedFont(StandardFonts.Helvetica),
        color: rgb(0.2, 0.2, 0.2), 
      });
  
      // Add date of generation
      const currentDate = new Date().toLocaleDateString();
      page.drawText(`Date of Generation: ${currentDate}`, {
        x: 100,
        y: 50,
        size: 18,
        font: await pdfDoc.embedFont(StandardFonts.Helvetica),
        color: rgb(0, 0, 0), 
      });
  
      // Télécharger le PDF généré
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'certificate.pdf';
      link.click();
    }
  };
  
  
  return (
    <>
      <Navbarjs />
      <div className="bg-gray-200 min-h-screen flex justify-center items-center pt-4">
        <div className="max-w-lg bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-8">{quiz.title}</h2>
            {score !== null ? (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2">Your Score:</h3>
                <p className="text-3xl font-bold text-center">
                  {score.percentage}%
                </p>
                <p className={`text-center text-lg ${bgColorClass} ${textColorClass}`}>
                  {getObservationMessage(score.observation)}
                </p>
                {score.percentage > 80 && (
  <div className="flex items-center">
    <p className="text-lg font-semibold mr-2">Generate Certificate:</p>
    <button onClick={generateCertificate} className="mt-4 bg-gray-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
      <GrCertificate className="mr-2" /> 
    </button>
  </div>
)}

                <div className="flex items-center mt-4">
                  <p className="text-lg font-semibold mr-2">Share on LinkedIn:</p>
                  <button onClick={handleShare}><GrLinkedin className='w-6 h-6' /></button>
                </div>
              </div>
            ) : (
              <div className="mb-8">
                {showLastQuestion && (
                  <>
                    <div className="h-2 bg-gray-600 rounded-full mb-4" style={{ width: `${(timeLeft / 15) * 100}%` }}></div>
                    <Countdown date={Date.now() + timeLeft * 1000} onComplete={handleQuestionChange} renderer={({ seconds }) => null} />
                  </>
                )}
                <h3 className="text-xl font-semibold mb-4">{quiz.questions[currentQuestionIndex].text}</h3>
                <ul>
                  {quiz.questions[currentQuestionIndex].options.map((option, optionIndex) => (
                    <li key={optionIndex} className="mb-4">
                      <label className="flex items-center text-lg">
                        <input
                          type="radio"
                          name={`question-${currentQuestionIndex}`}
                          value={optionIndex}
                          checked={answers[currentQuestionIndex] === optionIndex}
                          onChange={() => handleAnswerChange(currentQuestionIndex, optionIndex)}
                          className="mr-2"
                        />
                        {option}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <ol className="flex items-center">
              {quiz.questions.map((question, index) => (
                <li key={index} className={`relative w-full mb-6 ${index <= currentQuestionIndex ? 'text-gray-900' : 'text-gray-300'}`}>
                  <div className="flex items-center">
                    <div className={`z-10 flex items-center justify-center w-6 h-6 ${index <= currentQuestionIndex ? 'bg-gray-600' : 'bg-gray-200'} rounded-full ring-0 ring-white dark:bg-gray-900 sm:ring-8 dark:ring-gray-900 shrink-0`}>
                      {index < currentQuestionIndex ? (
                        <svg className="w-2.5 h-2.5 text-blue-100 dark:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                        </svg>
                      ) : (
                        <span className="flex w-3 h-3 bg-gray-600 rounded-full"></span>
                      )}
                    </div>
                    {index < quiz.questions.length - 1 && (
                      <div className="flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                    )}
                  </div>
                  <div className="mt-3">
                    <h3 className="font-medium">{`Step ${index + 1}`}</h3>
                  </div>
                </li>
              ))}
            </ol>
            <div className="flex justify-end">
              <Link
                to={`/quizss`}
                className="inline-block p-1 text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <svg className="w-6 h-6 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Quiz;
