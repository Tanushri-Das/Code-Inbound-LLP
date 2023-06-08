// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const SurveyScreen = () => {
//   const navigate = useNavigate();
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [surveyCompleted, setSurveyCompleted] = useState(false);

//   useEffect(() => {
//     const savedQuestions = localStorage.getItem("surveyQuestions");
//     if (savedQuestions) {
//       setQuestions(JSON.parse(savedQuestions));
//     } else {
//       const initialQuestions = [
//         "How satisfied are you with our products?",
//         "How fair are the prices compared to similar retailers?",
//         "How satisfied are you with the value for money of your purchase?",
//         "On a scale of 1-10 how would you recommend us to your friends and family?",
//         "What could we do to improve our service?",
//       ];
//       const formattedQuestions = initialQuestions.reduce(
//         (acc, question, index) => {
//           acc[`Q${index}`] = question;
//           return acc;
//         },
//         {}
//       );
//       setQuestions(formattedQuestions);
//       localStorage.setItem(
//         "surveyQuestions",
//         JSON.stringify(formattedQuestions)
//       );
//     }
//   }, []);

//   const handleAnswer = (value) => {
//     const questionId = `Q${currentQuestion}`;
//     const updatedAnswers = { ...answers, [questionId]: value };
//     setAnswers(updatedAnswers);
//   };

//   const handleNextQuestion = () => {
//     if (currentQuestion < Object.keys(questions).length - 1) {
//       setCurrentQuestion((prevQuestion) => prevQuestion + 1);
//     }
//   };

//   const handlePrevQuestion = () => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion((prevQuestion) => prevQuestion - 1);
//     }
//   };

//   const handleFinish = () => {
//     const confirmed = window.confirm("Are you sure you want to submit the survey?");
//     if (confirmed) {
//       setSurveyCompleted(true);
//       navigate("/confirmation");
//     }
//   };

//   const addQuestion = () => {
//     const newQuestion = window.prompt("Enter a new question");
//     if (newQuestion) {
//       const questionId = `Q${Object.keys(questions).length}`;
//       const updatedQuestions = { ...questions, [questionId]: newQuestion };
//       setQuestions(updatedQuestions);
//       localStorage.setItem("surveyQuestions", JSON.stringify(updatedQuestions));
//     }
//   };

//   useEffect(() => {
//     const savedAnswers = localStorage.getItem("surveyAnswers");
//     if (savedAnswers) {
//       setAnswers(JSON.parse(savedAnswers));
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("surveyAnswers", JSON.stringify(answers));
//   }, [answers]);

//   useEffect(() => {
//     const isSurveyCompleted = localStorage.getItem("surveyCompleted");
//     if (isSurveyCompleted === "COMPLETED") {
//       setSurveyCompleted(true);
//     }
//   }, []);

//   useEffect(() => {
//     if (surveyCompleted) {
//       const redirectTimeout = setTimeout(() => {
//         navigate("/");
//       }, 5000);

//       return () => clearTimeout(redirectTimeout);
//     }
//   }, [surveyCompleted, navigate]);

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-blue-300">
//       <h1 className="text-4xl font-bold mb-28">Customer Survey</h1>
//       <h2 className="text-2xl font-bold mb-10 md:ml-[480px]">
//         {currentQuestion + 1}/{Object.keys(questions).length}
//       </h2>
//       <p className="text-xl mb-6">{`${currentQuestion + 1}. ${" "}${questions[`Q${currentQuestion}`]}`}</p>

//       <div>
//         {currentQuestion < 3 ? (
//           <div className="flex items-center justify-center">
//             {[...Array(5)].map((_, index) => (
//               <div
//                 key={index}
//                 className={`rounded-full font-semibold w-10 h-10 flex items-center justify-center cursor-pointer mx-2
//           ${
//             answers[`Q${currentQuestion}`] === index + 1
//               ? "bg-red-500 text-white"
//               : "bg-white"
//           }`}
//                 onClick={() => handleAnswer(index + 1)}
//               >
//                 {index + 1}
//               </div>
//             ))}
//           </div>
//         ) : currentQuestion === 3 ? (
//           <div className="flex items-center justify-center">
//             {[...Array(10)].map((_, index) => (
//               <div
//                 key={index}
//                 className={`rounded-full w-10 h-10 flex items-center justify-center cursor-pointer mx-2
//           ${
//             answers[`Q${currentQuestion}`] === index + 1
//               ? "bg-red-600 text-white"
//               : "bg-white"
//           }`}
//                 onClick={() => handleAnswer(index + 1)}
//               >
//                 {index + 1}
//               </div>
//             ))}
//           </div>
//         ) : (
//           <textarea
//             rows="4"
//             className="border border-gray-300 p-2 w-64 mb-4"
//             onChange={(event) => handleAnswer(event.target.value)}
//             value={answers[`Q${currentQuestion}`] || ""}
//           />
//         )}
//       </div>
//       <div className="flex justify-between mt-10">
//         {currentQuestion > 0 && (
//           <button
//             className="bg-blue-800 text-white py-2 px-4 rounded mr-12"
//             onClick={handlePrevQuestion}
//           >
//             Previous
//           </button>
//         )}
//         {currentQuestion < Object.keys(questions).length - 1 && (
//           <button
//             className="bg-pink-600 hover:bg-pink-400 text-white py-2 px-4 rounded"
//             onClick={handleNextQuestion}
//           >
//             Next
//           </button>
//         )}
//         {currentQuestion === Object.keys(questions).length - 1 && (
//           <>
//             <button
//               className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
//               onClick={handleFinish}
//             >
//               Finish
//             </button>
//             <button
//               className="bg-amber-600 text-white py-2 px-4 rounded ml-12"
//               onClick={addQuestion}
//             >
//               Add Question
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SurveyScreen;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const SurveyScreen = () => {
//   const navigate = useNavigate();
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [surveyCompleted, setSurveyCompleted] = useState(false);
//   const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
//   const [newQuestion, setNewQuestion] = useState("");

//   useEffect(() => {
//     const savedQuestions = localStorage.getItem("surveyQuestions");
//     if (savedQuestions) {
//       setQuestions(JSON.parse(savedQuestions));
//     } else {
//       const initialQuestions = [
//         "How satisfied are you with our products?",
//         "How fair are the prices compared to similar retailers?",
//         "How satisfied are you with the value for money of your purchase?",
//         "On a scale of 1-10 how would you recommend us to your friends and family?",
//         "What could we do to improve our service?",
//       ];
//       const formattedQuestions = initialQuestions.reduce(
//         (acc, question, index) => {
//           acc[`Q${index}`] = question;
//           return acc;
//         },
//         {}
//       );
//       setQuestions(formattedQuestions);
//       localStorage.setItem(
//         "surveyQuestions",
//         JSON.stringify(formattedQuestions)
//       );
//     }
//   }, []);

//   const handleAnswer = (value) => {
//     const questionId = `Q${currentQuestion}`;
//     const updatedAnswers = { ...answers, [questionId]: value };
//     setAnswers(updatedAnswers);
//   };

//   const handleNextQuestion = () => {
//     if (currentQuestion < Object.keys(questions).length - 1) {
//       setCurrentQuestion((prevQuestion) => prevQuestion + 1);
//     }
//   };

//   const handlePrevQuestion = () => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion((prevQuestion) => prevQuestion - 1);
//     }
//   };

//   const handleFinish = () => {
//     const confirmed = window.confirm(
//       "Are you sure you want to submit the survey?"
//     );
//     if (confirmed) {
//       setSurveyCompleted(true);
//       navigate("/confirmation");
//     }
//   };

//   const openAddQuestionModal = () => {
//     setShowAddQuestionModal(true);
//   };

//   const closeAddQuestionModal = () => {
//     setShowAddQuestionModal(false);
//     setNewQuestion("");
//   };

//   const handleNewQuestionChange = (event) => {
//     setNewQuestion(event.target.value);
//   };

//   const addQuestion = () => {
//     if (newQuestion) {
//       const questionId = `Q${Object.keys(questions).length}`;
//       const updatedQuestions = { ...questions, [questionId]: newQuestion };
//       setQuestions(updatedQuestions);
//       localStorage.setItem("surveyQuestions", JSON.stringify(updatedQuestions));
//       setCurrentQuestion(Object.keys(updatedQuestions).length - 1); // Set currentQuestion to the newly added question index
//       closeAddQuestionModal();
//     }
//   };

//   useEffect(() => {
//     const savedAnswers = localStorage.getItem("surveyAnswers");
//     if (savedAnswers) {
//       setAnswers(JSON.parse(savedAnswers));
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("surveyAnswers", JSON.stringify(answers));
//   }, [answers]);

//   useEffect(() => {
//     const isSurveyCompleted = localStorage.getItem("surveyCompleted");
//     if (isSurveyCompleted === "COMPLETED") {
//       setSurveyCompleted(true);
//     }
//   }, []);

//   useEffect(() => {
//     if (surveyCompleted) {
//       const redirectTimeout = setTimeout(() => {
//         navigate("/");
//       }, 5000);

//       return () => clearTimeout(redirectTimeout);
//     }
//   }, [surveyCompleted, navigate]);

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-blue-300">
//       <h1 className="text-4xl font-bold mb-28 text-white">Customer Survey</h1>
//       <h2 className="text-2xl font-bold mb-10 text-white">
//         {currentQuestion + 1}/{Object.keys(questions).length}
//       </h2>
//       <p className="text-xl mx-4 md:mx-0 mb-6 text-white font-semibold">{`${
//         currentQuestion + 1
//       }. ${" "}${questions[`Q${currentQuestion}`]}`}</p>

//       <div>
//         {currentQuestion < 3 ? (
//           <div className="flex items-center justify-center">
//             {[...Array(5)].map((_, index) => (
//               <div
//                 key={index}
//                 className={`rounded-full font-semibold w-10 h-10 flex items-center justify-center cursor-pointer mx-2 
//           ${
//             answers[`Q${currentQuestion}`] === index + 1
//               ? "bg-red-500 text-white"
//               : "bg-white"
//           }`}
//                 onClick={() => handleAnswer(index + 1)}
//               >
//                 {index + 1}
//               </div>
//             ))}
//           </div>
//         ) : currentQuestion === 3 ? (
//           <div className="flex items-center justify-center flex-wrap">
//             {[...Array(10)].map((_, index) => (
//               <div
//                 key={index}
//                 className={`rounded-full w-10 h-10 flex items-center justify-center cursor-pointer mx-2 mb-2
//         ${
//           answers[`Q${currentQuestion}`] === index + 1
//             ? "bg-red-600 text-white"
//             : "bg-white"
//         }`}
//                 onClick={() => handleAnswer(index + 1)}
//               >
//                 {index + 1}
//               </div>
//             ))}
//           </div>
//         ) : (
//           <textarea
//             rows="4"
//             className="border border-gray-300 p-2 w-64 mb-4"
//             onChange={(event) => handleAnswer(event.target.value)}
//             value={answers[`Q${currentQuestion}`] || ""}
//           />
//         )}
//       </div>
//       <div className="flex justify-between flex-wrap mt-10 space-x-3 md:space-x-12">
//         {currentQuestion > 0 && (
//           <button
//             className="bg-blue-800 text-white py-2 px-4 rounded mb-2"
//             onClick={handlePrevQuestion}
//           >
//             Previous
//           </button>
//         )}
//         {currentQuestion < Object.keys(questions).length - 1 && (
//           <button
//             className="bg-pink-600 text-white py-2 px-4 rounded mb-2"
//             onClick={handleNextQuestion}
//           >
//             Next
//           </button>
//         )}
//         {currentQuestion === Object.keys(questions).length - 1 && (
//           <>
//             <button
//               className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded mb-2"
//               onClick={handleFinish}
//             >
//               Finish
//             </button>
//             <button
//               className="bg-amber-600 text-white py-2 px-4 rounded mb-2 md:mr-12"
//               onClick={openAddQuestionModal}
//             >
//               Add Question
//             </button>
//           </>
//         )}
//       </div>

//       {showAddQuestionModal && (
//         <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-gray-700 bg-opacity-50">
//           <div className="bg-white p-8 rounded shadow">
//             <h2 className="text-lg font-bold mb-4">Add New Question</h2>
//             <input
//               type="text"
//               className="border border-gray-300 p-2 w-full mb-4"
//               value={newQuestion}
//               onChange={handleNewQuestionChange}
//             />
//             <div className="flex justify-end">
//               <button
//                 className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2"
//                 onClick={addQuestion}
//               >
//                 Add
//               </button>
//               <button
//                 className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
//                 onClick={closeAddQuestionModal}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SurveyScreen;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { confirmAlert } from "react-confirm-alert";
// import "react-confirm-alert/src/react-confirm-alert.css";

// const SurveyScreen = () => {
//   const navigate = useNavigate();
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [surveyCompleted, setSurveyCompleted] = useState(false);
//   const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
//   const [newQuestion, setNewQuestion] = useState("");

//   useEffect(() => {
//     const savedQuestions = localStorage.getItem("surveyQuestions");
//     if (savedQuestions) {
//       setQuestions(JSON.parse(savedQuestions));
//     } else {
//       const initialQuestions = [
//         "How satisfied are you with our products?",
//         "How fair are the prices compared to similar retailers?",
//         "How satisfied are you with the value for money of your purchase?",
//         "On a scale of 1-10, how likely are you to recommend us to your friends and family?",
//         "What could we do to improve our service?",
//       ];
//       const formattedQuestions = initialQuestions.reduce(
//         (acc, question, index) => {
//           acc[`Q${index}`] = question;
//           return acc;
//         },
//         {}
//       );
//       setQuestions(formattedQuestions);
//       localStorage.setItem(
//         "surveyQuestions",
//         JSON.stringify(formattedQuestions)
//       );
//     }
//   }, []);

//   const handleAnswer = (value) => {
//     const questionId = `Q${currentQuestion}`;
//     const updatedAnswers = { ...answers, [questionId]: value };
//     setAnswers(updatedAnswers);
//   };

//   const handleNextQuestion = () => {
//     if (currentQuestion < Object.keys(questions).length - 1) {
//       setCurrentQuestion((prevQuestion) => prevQuestion + 1);
//     }
//   };

//   const handlePrevQuestion = () => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion((prevQuestion) => prevQuestion - 1);
//     }
//   };

//   const handleFinish = () => {
//     confirmAlert({
//       title: "Confirm Submission",
//       message: "Are you sure you want to submit the survey?",
//       buttons: [
//         {
//           label: "Submit",
//           onClick: () => {
//             setSurveyCompleted(true);
//             navigate("/confirmation");
//           },
//         },
//         {
//           label: "Cancel",
//           onClick: () => {},
//         },
//       ],
//     });
//   };

//   const openAddQuestionModal = () => {
//     setShowAddQuestionModal(true);
//   };

//   const closeAddQuestionModal = () => {
//     setShowAddQuestionModal(false);
//     setNewQuestion("");
//   };

//   const handleNewQuestionChange = (event) => {
//     setNewQuestion(event.target.value);
//   };

//   const addQuestion = () => {
//     if (newQuestion) {
//       const questionId = `Q${Object.keys(questions).length}`;
//       const updatedQuestions = { ...questions, [questionId]: newQuestion };
//       setQuestions(updatedQuestions);
//       localStorage.setItem("surveyQuestions", JSON.stringify(updatedQuestions));
//       setCurrentQuestion(Object.keys(updatedQuestions).length - 1); // Set currentQuestion to the newly added question index
//       closeAddQuestionModal();
//     }
//   };

//   useEffect(() => {
//     const savedAnswers = localStorage.getItem("surveyAnswers");
//     if (savedAnswers) {
//       setAnswers(JSON.parse(savedAnswers));
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("surveyAnswers", JSON.stringify(answers));
//   }, [answers]);

//   useEffect(() => {
//     const isSurveyCompleted = localStorage.getItem("surveyCompleted");
//     if (isSurveyCompleted === "COMPLETED") {
//       setSurveyCompleted(true);
//     }
//   }, []);

//   useEffect(() => {
//     if (surveyCompleted) {
//       const redirectTimeout = setTimeout(() => {
//         navigate("/");
//       }, 5000);

//       return () => clearTimeout(redirectTimeout);
//     }
//   }, [surveyCompleted, navigate]);

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-blue-300">
//       <h1 className="text-4xl font-bold mb-28 text-white">Customer Survey</h1>
//       <h2 className="text-2xl font-bold mb-10 text-white">
//         {currentQuestion + 1}/{Object.keys(questions).length}
//       </h2>
//       <p className="text-xl mx-4 md:mx-0 mb-6 text-white font-semibold">{`${
//         currentQuestion + 1
//       }. ${" "}${questions[`Q${currentQuestion}`]}`}</p>

//       <div>
//         {currentQuestion < 3 ? (
//           <div className="flex items-center justify-center">
//             {[...Array(5)].map((_, index) => (
//               <div
//                 key={index}
//                 className={`rounded-full font-semibold w-10 h-10 flex items-center justify-center cursor-pointer mx-2 
//           ${
//             answers[`Q${currentQuestion}`] === index + 1
//               ? "bg-red-500 text-white"
//               : "bg-white"
//           }`}
//                 onClick={() => handleAnswer(index + 1)}
//               >
//                 {index + 1}
//               </div>
//             ))}
//           </div>
//         ) : currentQuestion === 3 ? (
//           <div className="flex items-center justify-center flex-wrap">
//             {[...Array(10)].map((_, index) => (
//               <div
//                 key={index}
//                 className={`rounded-full w-10 h-10 flex items-center justify-center cursor-pointer mx-2 mb-2
//         ${
//           answers[`Q${currentQuestion}`] === index + 1
//             ? "bg-red-600 text-white"
//             : "bg-white"
//         }`}
//                 onClick={() => handleAnswer(index + 1)}
//               >
//                 {index + 1}
//               </div>
//             ))}
//           </div>
//         ) : (
//           <textarea
//             rows="4"
//             className="border border-gray-300 p-2 w-64 mb-4"
//             onChange={(event) => handleAnswer(event.target.value)}
//             value={answers[`Q${currentQuestion}`] || ""}
//           />
//         )}
//       </div>
//       <div className="flex justify-between flex-wrap mt-10 space-x-3 md:space-x-12">
//         {currentQuestion > 0 && (
//           <button
//             className="bg-blue-800 text-white py-2 px-4 rounded mb-2"
//             onClick={handlePrevQuestion}
//           >
//             Previous
//           </button>
//         )}
//         {currentQuestion < Object.keys(questions).length - 1 && (
//           <button
//             className="bg-pink-600 text-white py-2 px-4 rounded mb-2"
//             onClick={handleNextQuestion}
//           >
//             Next
//           </button>
//         )}
//         {currentQuestion === Object.keys(questions).length - 1 && (
//           <>
//             <button
//               className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded mb-2"
//               onClick={handleFinish}
//             >
//               Finish
//             </button>
//             <button
//               className="bg-purple-500 hover:bg-purple-700 text-white py-2 px-4 rounded mb-2"
//               onClick={openAddQuestionModal}
//             >
//               Add Question
//             </button>
//           </>
//         )}
//       </div>

//       {showAddQuestionModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
//           <div className="bg-white rounded-lg p-8">
//             <h2 className="text-2xl font-bold mb-4">Add Question</h2>
//             <textarea
//               className="border border-gray-300 p-2 mb-4 w-64"
//               placeholder="Enter your question"
//               onChange={handleNewQuestionChange}
//               value={newQuestion}
//             />
//             <div className="flex justify-end">
//               <button
//                 className="bg-gray-400 hover:bg-gray-600 text-white py-2 px-4 rounded mr-2"
//                 onClick={closeAddQuestionModal}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
//                 onClick={addQuestion}
//               >
//                 Add
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SurveyScreen;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const SurveyScreen = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");

  useEffect(() => {
    const savedQuestions = localStorage.getItem("surveyQuestions");
    if (savedQuestions) {
      setQuestions(JSON.parse(savedQuestions));
    } else {
      const initialQuestions = [
        "How satisfied are you with our products?",
        "How fair are the prices compared to similar retailers?",
        "How satisfied are you with the value for money of your purchase?",
        "On a scale of 1-10, how likely are you to recommend us to your friends and family?",
        "What could we do to improve our service?",
      ];
      const formattedQuestions = initialQuestions.reduce(
        (acc, question, index) => {
          acc[`Q${index}`] = question;
          return acc;
        },
        {}
      );
      setQuestions(formattedQuestions);
      localStorage.setItem(
        "surveyQuestions",
        JSON.stringify(formattedQuestions)
      );
    }
  }, []);

  const handleAnswer = (value) => {
    const questionId = `Q${currentQuestion}`;
    const updatedAnswers = { ...answers, [questionId]: value };
    setAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < Object.keys(questions).length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prevQuestion) => prevQuestion - 1);
    }
  };

  const handleFinish = () => {
    confirmAlert({
      title: "Confirm Submission",
      message: "Are you sure you want to submit the survey?",
      buttons: [
        {
          label: "Submit",
          style: {
            backgroundColor: "#1E40AF",
            color: "white",
            padding: "0.5rem 1rem",
            borderRadius: "0.25rem",
            fontSize: "1.25rem",
          },
          onClick: () => {
            setSurveyCompleted(true);
            localStorage.setItem("surveyCompleted", "COMPLETED");
            navigate("/confirmation");
          },
        },
        {
          label: "Cancel",
          style: {
            backgroundColor: "red",
            color: "white",
            padding: "0.5rem 1rem",
            borderRadius: "0.25rem",
            fontSize: "1.25rem",
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

  const addQuestion = () => {
    if (newQuestion) {
      const questionId = `Q${Object.keys(questions).length}`;
      const updatedQuestions = { ...questions, [questionId]: newQuestion };
      setQuestions(updatedQuestions);
      localStorage.setItem("surveyQuestions", JSON.stringify(updatedQuestions));
      setCurrentQuestion(Object.keys(updatedQuestions).length - 1); // Set currentQuestion to the newly added question index
      closeAddQuestionModal();
    }
  };

  useEffect(() => {
    const savedAnswers = localStorage.getItem("surveyAnswers");
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("surveyAnswers", JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    const isSurveyCompleted = localStorage.getItem("surveyCompleted");
    if (isSurveyCompleted === "COMPLETED") {
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
    <div className="flex flex-col items-center justify-center h-screen bg-blue-300">
      <h1 className="text-4xl font-bold mb-28 text-white">Customer Survey</h1>
      <h2 className="text-2xl font-bold mb-10 text-white">
        {currentQuestion + 1}/{Object.keys(questions).length}
      </h2>
      <p className="text-xl mx-4 md:mx-0 mb-6 text-white font-semibold">{`${
        currentQuestion + 1
      }. ${" "}${questions[`Q${currentQuestion}`]}`}</p>

      <div>
        {currentQuestion < 3 ? (
          <div className="flex items-center justify-center">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className={`rounded-full font-semibold w-10 h-10 flex items-center justify-center cursor-pointer mx-2 
          ${
            answers[`Q${currentQuestion}`] === index + 1
              ? "bg-red-500 text-white"
              : "bg-white"
          }`}
                onClick={() => handleAnswer(index + 1)}
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
          answers[`Q${currentQuestion}`] === index + 1
            ? "bg-red-600 text-white"
            : "bg-white"
        }`}
                onClick={() => handleAnswer(index + 1)}
              >
                {index + 1}
              </div>
            ))}
          </div>
        ) : (
          <textarea
            rows="4"
            className="border border-gray-300 p-2 w-64 mb-4"
            onChange={(event) => handleAnswer(event.target.value)}
            value={answers[`Q${currentQuestion}`] || ""}
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
        {currentQuestion < Object.keys(questions).length - 1 && (
          <button
            className="bg-pink-600 text-white py-2 px-4 rounded mb-2"
            onClick={handleNextQuestion}
          >
            Next
          </button>
        )}
        {currentQuestion === Object.keys(questions).length - 1 && (
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

      {showAddQuestionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded">
            <h2 className="text-xl font-bold mb-4">Add Question</h2>
            <textarea
              rows="4"
              className="border border-gray-300 p-2 w-64 mb-4"
              onChange={handleNewQuestionChange}
              value={newQuestion}
            />
            <div className="flex justify-end">
              <button
                className="bg-red-600 text-white py-2 px-4 rounded mr-2"
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
    </div>
  );
};

export default SurveyScreen;
