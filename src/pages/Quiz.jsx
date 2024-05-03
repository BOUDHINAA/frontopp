import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdOutlineQuiz } from "react-icons/md"; 
import { Navbarjs } from '@/widgets/layout';
import { Footer } from '@/widgets/layout';
import { CardBody, CardHeader, Card } from '@material-tailwind/react';
import { GrSearch} from "react-icons/gr";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDifficultyChange = (e) => {
    setSelectedDifficulty(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/evaluations'); // Endpoint pour récupérer les quizzes
      setQuizzes(response.data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchQuizzes();
  };

  const searchQuizzes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/evaluations/search', {
        params: {
          keywords: searchTerm,
          difficulty: selectedDifficulty,
          category: selectedCategory
        }
      });
      setQuizzes(response.data);
    } catch (error) {
      console.error('Error searching quizzes:', error);
    }
  };

  return (
    <>
      <Navbarjs />
      <Card className=' my-12 shadow-md mx-4 '>
        <CardHeader className='bg-gray-300 text-gray-900 text-center text-2xl text-bold '>Quiz List</CardHeader>
        <CardBody>
        <form onSubmit={handleSubmit} className="flex flex-wrap my-4">
            <div className="flex items-center w-full lg:w-1/4 p-2">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearch}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div className="flex items-center w-full lg:w-1/4 p-2">
              <select
                value={selectedDifficulty}
                onChange={handleDifficultyChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              >
                <option value="">Select Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div className="flex items-center w-full lg:w-1/4 p-2">
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              >
                <option value="">Select Category</option>
                <option value="category1">Technical Skills</option>
                <option value="category2">Communication Skills</option>
                <option value="category3">Leadership Skills</option>
              </select>
            </div>
            <div className="w-full lg:w-1/4 p-2">
              <button type="submit" className=" text-gray-800 px-4 py-2 rounded-md">
                <GrSearch/>
              </button>
            </div>
          </form>

          <div className="grid grid-cols-3 gap-4">
            {quizzes.map((quiz) => (
              <div key={quiz._id} className="bg-gray-200 p-4 rounded-md">
                <h2 className="text-lg font-semibold text-black">{quiz.title}</h2>
                <p className="text-gray-700">{quiz.description}</p>
                <p className="text-gray-700">{quiz.keywords}</p>
                <p className="text-gray-700">{quiz.difficulty}</p>

                <Link to={`/quiz/${quiz._id}`} className="bg-red-800 text-white px-3 py-1 rounded-md mt-2 inline-block">
                  Take the quiz
                </Link>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
      <Footer />
    </>
  );
};

export default QuizList;