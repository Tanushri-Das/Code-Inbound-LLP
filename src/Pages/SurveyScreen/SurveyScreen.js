
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Spinner from "../../Components/Spinner/Spinner";

const SurveyScreen = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurveyQuestions = async () => {
      try {
        const response = await axios.get("https://survey-app-server-side.vercel.app/getQuestions");
        console.log(response.data);

        if (response.data && Array.isArray(response.data)) {
          const questionsData = response.data;
          const formattedQuestions = questionsData.map((question) => {
            console.log(question.question);
            return {
              _id: question._id,
              questionId: question._id, // Use the provided questionId
              question: question.question,
            };
          });

          setQuestions(formattedQuestions);
          setCurrentQuestion(0); // Reset current question to the first question

          // Store formattedQuestions in localStorage
          localStorage.setItem(
            "surveyQuestions",
            JSON.stringify(formattedQuestions)
          );
        } else {
          console.log("Invalid response data format");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSurveyQuestions();
  }, []);


  useEffect(() => {
    const startSession = async () => {
      try {
        // Generate a unique session ID using UUID
        const sessionId = uuidv4();

        // Send a request to start a new session
        const response = await axios.post("https://survey-app-server-side.vercel.app/startSession", {
          sessionId: sessionId,
        });

        console.log(response.data);

        // Store the session ID in localStorage
        localStorage.setItem("sessionId", sessionId);
      } catch (error) {
        console.log("Error starting session:", error);
      }
    };

    startSession();
  }, []);

  const handleAnswer = (questionId, value) => {
    const updatedAnswers = { ...answers, [questionId]: value };
    setAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prevQuestion) => prevQuestion - 1);
    }
  };

  
  const handleFinish = async () => {
    confirmAlert({
      title: 'Confirm Submission',
      message: 'Are you sure you want to submit the survey?',
      buttons: [
        {
          label: 'Submit',
          style: {
            backgroundColor: '#1E40AF',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '0.25rem',
            fontSize: '1.25rem',
          },
          onClick: async () => {
            try {
              const formattedAnswers = Object.entries(answers).map(
                ([questionId, answer]) => ({
                  questionId: questionId,questionId,
                  value: answer,
                })
              );
  
              // Save answers in the database
              await axios.post('https://survey-app-server-side.vercel.app/surveyAnswers', {
                answers: formattedAnswers,
                surveyCompleted: 'COMPLETED', // Update to string value
              });
  
              // Save survey completion status in local storage
              localStorage.setItem('surveyCompleted', 'COMPLETED');
              localStorage.setItem(
                'surveyAnswers',
                JSON.stringify({ ...answers, surveyCompleted: 'COMPLETED' })
              );
  
              setSurveyCompleted(true);
              navigate('/confirmation');
            } catch (error) {
              console.log(error);
            }
          },
        },
        {
          label: 'Cancel',
          style: {
            backgroundColor: 'red',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '0.25rem',
            fontSize: '1.25rem',
          },
          onClick: () => {},
        },
      ],
    });
  };

  const openAddQuestionModal = () => {
    setShowAddQuestionModal(true);
  };

  const closeAddQuestionModal = () => {
    setShowAddQuestionModal(false);
    setNewQuestion("");
  };

  const handleNewQuestionChange = (event) => {
    setNewQuestion(event.target.value);
  };

  const addQuestion = async () => {
    if (newQuestion) {
      try {
        const response = await axios.post("https://survey-app-server-side.vercel.app/addQuestion", {
          question: newQuestion,
        });

        console.log(response.data);

        const insertedQuestion = {
          _id: response.data._id,
          questionId: response.data._id,
          question: response.data.question,
        };
        const updatedQuestions = [...questions, insertedQuestion];
        setQuestions(updatedQuestions);
        setCurrentQuestion(updatedQuestions.length - 1);

        const formattedQuestions = updatedQuestions.map((question) => ({
          _id: question._id,
          questionId: question._id,
          question: question.question,
        }));
        localStorage.setItem(
          "surveyQuestions",
          JSON.stringify(formattedQuestions)
        );

        // Close the modal
        setShowAddQuestionModal(false);
      } catch (error) {
        console.log("Error:", error.response.data);
        console.log("Status:", error.response.status);
      }
    }
  };

  useEffect(() => {
    const isSurveyCompleted = localStorage.getItem("surveyCompleted");
    if (isSurveyCompleted === JSON.stringify("COMPLETED")) {
      setSurveyCompleted(true);
    }
  }, []);
  

  useEffect(() => {
    if (surveyCompleted) {
      const redirectTimeout = setTimeout(() => {
        navigate("/");
      }, 5000);

      return () => clearTimeout(redirectTimeout);
    }
  }, [surveyCompleted, navigate]);

  return (
    // <div className="flex flex-col items-center justify-center h-screen bg-blue-300">
    //   <h1 className="text-4xl font-bold mb-28 text-white">Customer Survey</h1>
    //   <h2 className="text-2xl font-bold mb-10 text-white">
    //     {currentQuestion + 1}/{questions.length}
    //   </h2>
    //   <p className="text-xl mx-4 md:mx-0 mb-6 text-white font-semibold">
    //     {`${currentQuestion + 1}. ${
    //       questions[currentQuestion] && questions[currentQuestion].question
    //     }`}
    //   </p>

    //   <div>
    //     {currentQuestion < 3 ? (
    //       <div className="flex items-center justify-center">
    //         {[...Array(5)].map((_, index) => (
    //           <div
    //             key={index}
    //             className={`rounded-full font-semibold w-10 h-10 flex items-center justify-center cursor-pointer mx-2 
    //         ${
    //           questions[currentQuestion] &&
    //           answers[questions[currentQuestion]._id] === index + 1
    //             ? "bg-red-500 text-white"
    //             : "bg-white"
    //         }`}
    //             onClick={() =>
    //               handleAnswer(questions[currentQuestion]._id, index + 1)
    //             }
    //           >
    //             {index + 1}
    //           </div>
    //         ))}
    //       </div>
    //     ) : currentQuestion === 3 ? (
    //       <div className="flex items-center justify-center flex-wrap">
    //         {[...Array(10)].map((_, index) => (
    //           <div
    //             key={index}
    //             className={`rounded-full w-10 h-10 flex items-center justify-center cursor-pointer mx-2 mb-2
    // ${
    //   answers[questions[currentQuestion]._id] === index + 1
    //     ? "bg-red-600 text-white"
    //     : "bg-white"
    // }`}
    //             onClick={() =>
    //               handleAnswer(questions[currentQuestion]._id, index + 1)
    //             }
    //           >
    //             {index + 1}
    //           </div>
    //         ))}
    //       </div>
    //     ) : (
    //       <textarea
    //         rows="4"
    //         className="border border-gray-300 p-2 w-64 mb-4"
    //         onChange={(event) =>
    //           handleAnswer(questions[currentQuestion]._id, event.target.value)
    //         }
    //         value={answers[questions[currentQuestion]._id] || ""}
    //       />
    //     )}
    //   </div>

    //   <div className="flex justify-between flex-wrap mt-10 space-x-3 md:space-x-12">
    //     {currentQuestion > 0 && (
    //       <button
    //         className="bg-blue-800 text-white py-2 px-4 rounded mb-2"
    //         onClick={handlePrevQuestion}
    //       >
    //         Previous
    //       </button>
    //     )}
    //     {currentQuestion < questions.length - 1 && (
    //       <button
    //         className="bg-pink-600 text-white py-2 px-4 rounded mb-2"
    //         onClick={handleNextQuestion}
    //       >
    //         Next
    //       </button>
    //     )}
    //     {currentQuestion === questions.length - 1 && (
    //       <>
    //         <button
    //           className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded mb-2"
    //           onClick={handleFinish}
    //         >
    //           Finish
    //         </button>
    //         <button
    //           className="bg-yellow-400 hover:bg-yellow-600 text-white py-2 px-4 rounded mb-2"
    //           onClick={openAddQuestionModal}
    //         >
    //           Add Question
    //         </button>
    //       </>
    //     )}
    //   </div>
    //   {surveyCompleted && (
    //     <p className="text-xl font-semibold mt-6 text-white">
    //       Thank you for completing the survey! You will be redirected to the
    //       homepage in a few seconds.
    //     </p>
    //   )}

    //   {showAddQuestionModal && (
    //     <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex items-center justify-center">
    //       <div className="bg-white rounded p-8">
    //         <h2 className="text-2xl font-bold mb-6">Add Question</h2>
    //         <input
    //           type="text"
    //           className="border border-gray-300 p-2 mb-4 w-64"
    //           placeholder="Enter the new question"
    //           value={newQuestion}
    //           onChange={handleNewQuestionChange}
    //         />
    //         <div className="flex justify-end">
    //           <button
    //             className="bg-blue-800 text-white py-2 px-4 rounded mr-2"
    //             onClick={closeAddQuestionModal}
    //           >
    //             Cancel
    //           </button>
    //           <button
    //             className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
    //             onClick={addQuestion}
    //           >
    //             Add
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </div>

<div className="flex flex-col items-center justify-center h-screen bg-blue-300">
{loading ? (
  <Spinner/>
) : (
  <>
          <h1 className="text-4xl font-bold mb-28 text-white">Customer Survey</h1>
      <h2 className="text-2xl font-bold mb-10 text-white">
        {currentQuestion + 1}/{questions.length}
      </h2>
      <p className="text-xl mx-4 md:mx-0 mb-6 text-white font-semibold">
        {`${currentQuestion + 1}. ${
          questions[currentQuestion] && questions[currentQuestion].question
        }`}
      </p>

      <div>
        {currentQuestion < 3 ? (
          <div className="flex items-center justify-center">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className={`rounded-full font-semibold w-10 h-10 flex items-center justify-center cursor-pointer mx-2 
            ${
              questions[currentQuestion] &&
              answers[questions[currentQuestion]._id] === index + 1
                ? "bg-red-500 text-white"
                : "bg-white"
            }`}
                onClick={() =>
                  handleAnswer(questions[currentQuestion]._id, index + 1)
                }
              >
                {index + 1}
              </div>
            ))}
          </div>
        ) : currentQuestion === 3 ? (
          <div className="flex items-center justify-center flex-wrap">
            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                className={`rounded-full w-10 h-10 flex items-center justify-center cursor-pointer mx-2 mb-2
    ${
      answers[questions[currentQuestion]._id] === index + 1
        ? "bg-red-600 text-white"
        : "bg-white"
    }`}
                onClick={() =>
                  handleAnswer(questions[currentQuestion]._id, index + 1)
                }
              >
                {index + 1}
              </div>
            ))}
          </div>
        ) : (
          <textarea
            rows="4"
            className="border border-gray-300 p-2 w-64 mb-4"
            onChange={(event) =>
              handleAnswer(questions[currentQuestion]._id, event.target.value)
            }
            value={answers[questions[currentQuestion]._id] || ""}
          />
        )}
      </div>

      <div className="flex justify-between flex-wrap mt-10 space-x-3 md:space-x-12">
        {currentQuestion > 0 && (
          <button
            className="bg-blue-800 text-white py-2 px-4 rounded mb-2"
            onClick={handlePrevQuestion}
          >
            Previous
          </button>
        )}
        {currentQuestion < questions.length - 1 && (
          <button
            className="bg-pink-600 text-white py-2 px-4 rounded mb-2"
            onClick={handleNextQuestion}
          >
            Next
          </button>
        )}
        {currentQuestion === questions.length - 1 && (
          <>
            <button
              className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded mb-2"
              onClick={handleFinish}
            >
              Finish
            </button>
            <button
              className="bg-yellow-400 hover:bg-yellow-600 text-white py-2 px-4 rounded mb-2"
              onClick={openAddQuestionModal}
            >
              Add Question
            </button>
          </>
        )}
      </div>
      {surveyCompleted && (
        <p className="text-xl font-semibold mt-6 text-white">
          Thank you for completing the survey! You will be redirected to the
          homepage in a few seconds.
        </p>
      )}

      {showAddQuestionModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded p-8">
            <h2 className="text-2xl font-bold mb-6">Add Question</h2>
            <input
              type="text"
              className="border border-gray-300 p-2 mb-4 w-64"
              placeholder="Enter the new question"
              value={newQuestion}
              onChange={handleNewQuestionChange}
            />
            <div className="flex justify-end">
              <button
                className="bg-blue-800 text-white py-2 px-4 rounded mr-2"
                onClick={closeAddQuestionModal}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
                onClick={addQuestion}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    
  </>
)}
</div>
  );
};

export default SurveyScreen;