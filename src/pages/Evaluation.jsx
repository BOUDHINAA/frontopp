import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar } from '@/widgets/layout';

const EvaluationList = () => {
  const [evaluations, setEvaluations] = useState([]);
  const [newEvaluation, setNewEvaluation] = useState({
    title: '',
    description: '',
    questions: [],
    category: '',
    difficulty: '',
    keywords: []
  });
  const [editingEvaluationId, setEditingEvaluationId] = useState(null);
  const [numOptions, setNumOptions] = useState(2);

  useEffect(() => {
    fetchEvaluations();
  }, []);

  const fetchEvaluations = async () => {
    try {
      const response = await axios.get('http://localhost:3000/evaluations');
      setEvaluations(response.data);
    } catch (error) {
      console.error('Error fetching evaluations:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvaluation((prevEvaluation) => ({
      ...prevEvaluation,
      [name]: value,
    }));
  };

  const handleAddQuestion = () => {
    setNewEvaluation((prevEvaluation) => ({
      ...prevEvaluation,
      questions: [
        ...prevEvaluation.questions,
        { text: '', options: new Array(numOptions).fill(''), correctOptionIndex: 0 },
      ],
    }));
  };

  const handleRemoveQuestion = (index) => {
    setNewEvaluation((prevEvaluation) => ({
      ...prevEvaluation,
      questions: prevEvaluation.questions.filter((_, i) => i !== index),
    }));
  };

  const handleQuestionInputChange = (e, index, field) => {
    const { value } = e.target;
    const updatedQuestions = [...newEvaluation.questions];
    updatedQuestions[index][field] = value;

    setNewEvaluation((prevEvaluation) => ({
      ...prevEvaluation,
      questions: updatedQuestions,
    }));
  };

  const handleOptionInputChange = (e, questionIndex, optionIndex) => {
    const { value } = e.target;
    const updatedQuestions = newEvaluation.questions.map((question, i) => {
      if (i === questionIndex) {
        const updatedOptions = [...question.options];
        updatedOptions[optionIndex] = value;
        return { ...question, options: updatedOptions };
      }
      return question;
    });

    setNewEvaluation((prevEvaluation) => ({
      ...prevEvaluation,
      questions: updatedQuestions,
    }));
  };

  const handleCorrectOptionChange = (e, questionIndex) => {
    const { value } = e.target;
    const updatedQuestions = newEvaluation.questions.map((question, i) => {
      if (i === questionIndex) {
        return { ...question, correctOptionIndex: parseInt(value) };
      }
      return question;
    });

    setNewEvaluation((prevEvaluation) => ({
      ...prevEvaluation,
      questions: updatedQuestions,
    }));
  };

  const handleCreateEvaluation = async () => {
    try {
      await axios.post('http://localhost:3000/evaluations/add', newEvaluation);
      setNewEvaluation({ title: '', description: '', questions: [], category: '', difficulty: '', keywords: [] });
      fetchEvaluations();
    } catch (error) {
      console.error('Error creating evaluation:', error);
    }
  };

  const handleEditEvaluation = async (evaluationId) => {
    setEditingEvaluationId(evaluationId);
    const evaluationToEdit = evaluations.find(
      (evaluation) => evaluation._id === evaluationId
    );
    setNewEvaluation(evaluationToEdit);
  };

  const handleUpdateEvaluation = async () => {
    try {
      await axios.put(
        `http://localhost:3000/evaluations/update/${editingEvaluationId}`,
        newEvaluation
      );
      setEditingEvaluationId(null);
      setNewEvaluation({ title: '', description: '', questions: [], category: '', difficulty: '', keywords: [] });
      fetchEvaluations();
    } catch (error) {
      console.error('Error updating evaluation:', error);
    }
  };

  const handleDeleteEvaluation = async (evaluationId) => {
    try {
      await axios.delete(`http://localhost:3000/evaluations/delete/${evaluationId}`);
      fetchEvaluations();
    } catch (error) {
      console.error('Error deleting evaluation:', error);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="container mx-auto mt-8 p-4 bg-white rounded-lg shadow-lg ">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Evaluation List</h1>
      <div className="grid grid-cols-3 gap-4">
        {evaluations.map((evaluation) => (
          <div key={evaluation._id} className="bg-gray-200 p-4 rounded-md">
            <h2 className="text-lg font-semibold text-black">{evaluation.title}</h2>
            <p className="text-gray-700">{evaluation.description}</p>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-red-500 text-white px-3 py-1 rounded-md mr-2"
                onClick={() => handleEditEvaluation(evaluation._id)}
              >
                Edit
              </button>
              <button
                className="bg-black text-white px-3 py-1 rounded-md mr-2"
                onClick={() => handleDeleteEvaluation(evaluation._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Add a New Evaluation</h2>
        <div className="flex flex-col md:flex-row md:items-center mb-4">
          <input
            type="text"
            name="title"
            value={newEvaluation.title}
            onChange={handleInputChange}
            placeholder="Title"
            className="border rounded-md px-3 py-2 mb-2 md:mr-2"
          />
           <input
            type="text"
            name="description"
            value={newEvaluation.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="border rounded-md px-3 py-2 mb-2 md:mr-2"
          />
                    <select
  name="category"
  value={newEvaluation.category}
  onChange={handleInputChange}
  className="border rounded-md px-3 py-2 mb-2 md:mr-2"
>
  <option value="">Select Category</option>
  <option value="category1">Technical Skills</option>
  <option value="category2">Communication Skills</option>
  <option value="category3">Leadership Skills</option>
</select>
<select
  name="difficulty"
  value={newEvaluation.difficulty}
  onChange={handleInputChange}
  className="border rounded-md px-3 py-2 mb-2 md:mr-2"
>
  <option value="">Select Difficulty</option>
  <option value="easy">Easy</option>
  <option value="medium">Medium</option>
  <option value="hard">Hard</option>
</select>
                     <input
            type="text"
            name="keywords"
            value={newEvaluation.keywords}
            onChange={handleInputChange}
            placeholder="Keywords"
            className="border rounded-md px-3 py-2 mb-2 md:mr-2"
          />
          
          <label htmlFor="numOptions" className="mr-2">Number of Options:</label>
          <select
            id="numOptions"
            value={numOptions}
            onChange={(e) => setNumOptions(parseInt(e.target.value))}
            className="border rounded-md px-3 py-2 mb-2 md:mr-2"
          >
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </select>
          <button
            className="bg-red-700 text-white px-4 py-2 rounded-md"
            onClick={handleAddQuestion}
          >
            Add Question
          </button>
        </div>
        {newEvaluation.questions.map((question, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-md mb-4">
            <input
              type="text"
              name={`questions.${index}.text`}
              value={question.text}
              onChange={(e) => handleQuestionInputChange(e, index, 'text')}
              placeholder={`Question ${index + 1}`}
              className="border rounded-md px-3 py-2 mb-2"
            />
            {Array.from({ length: numOptions }).map((_, optionIndex) => (
              <input
                key={optionIndex}
                type="text"
                value={question.options[optionIndex] || ''}
                onChange={(e) => handleOptionInputChange(e, index, optionIndex)}
                placeholder={`Option ${optionIndex + 1}`}
                className="border rounded-md px-3 py-2 mb-2"
              />
            ))}
            <label htmlFor="numOptions" className="mr-2">Correct option:</label>
            <select
              value={question.correctOptionIndex}
              onChange={(e) => handleCorrectOptionChange(e, index)}
              className="border rounded-md px-3 py-2 mb-2"
            >
              {Array.from({ length: numOptions }).map((_, optionIndex) => (
                <option key={optionIndex} value={optionIndex}>
                  Option {optionIndex + 1}
                </option>
              ))}
            </select>
            <button
              className="bg-gray-500 text-white px-2 py-1 rounded-md"
              onClick={() => handleRemoveQuestion(index)}
            >
              Remove
            </button>
          </div>
        ))}
        {editingEvaluationId ? (
          <button
            className="bg-red-700 text-white px-4 py-2 mt-4 rounded-md"
            onClick={handleUpdateEvaluation}
          >
            Update Evaluation
          </button>
        ) : (
          <button
            className="bg-red-700 text-white px-4 py-2 mt-4 rounded-md"
            onClick={handleCreateEvaluation}
          >
            Create New Evaluation
          </button>
        )}
      </div>
    </div>
    </>
  );
};

export default EvaluationList;
