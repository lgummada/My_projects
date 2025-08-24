import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [quizOver, setQuizOver] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await axios.get("http://127.0.0.1:5000/questions");
      setQuestions(res.data);
    };
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (!quizOver && questions.length > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 1) {
            handleNext();
            return 10;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentIndex, quizOver, questions]);

  const handleAnswer = (option) => {
    if (!selected) {
      setSelected(option);
      setShowFeedback(true);

      const correct = option === questions[currentIndex].correct_option;
      if (correct) setScore((prev) => prev + 1);

      setUserAnswers((prev) => [
        ...prev,
        { question: questions[currentIndex].question, selected: option, correct: questions[currentIndex].correct_option, options: [questions[currentIndex].option1, questions[currentIndex].option2, questions[currentIndex].option3, questions[currentIndex].option4] }
      ]);

      setTimeout(() => handleNext(), 1000); // Show feedback 1s
    }
  };

  const handleNext = () => {
    setSelected(null);
    setShowFeedback(false);
    setTimeLeft(10);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setQuizOver(true);
    }
  };

  const restartQuiz = () => {
    setQuizOver(false);
    setCurrentIndex(0);
    setScore(0);
    setUserAnswers([]);
    setTimeLeft(10);
  };

  if (questions.length === 0) return <p>Loading questions...</p>;

  if (quizOver)
    return (
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-center">Quiz Completed!</h2>
        <p className="text-xl mb-2 text-center">
          Your Score: {score}/{questions.length}
        </p>
        <p className="text-lg mb-6 text-center">
          Percentage: {((score / questions.length) * 100).toFixed(0)}%
        </p>

        <h3 className="text-2xl font-semibold mb-4">Review Answers:</h3>
        <div className="space-y-4">
          {userAnswers.map((ua, idx) => (
            <div key={idx} className="p-4 border rounded-lg">
              <p className="font-bold">{idx + 1}. {ua.question}</p>
              {ua.options.map((opt, i) => (
                <p
                  key={i}
                  className={`ml-4 ${
                    i + 1 === ua.correct ? "text-green-600 font-semibold" :
                    i + 1 === ua.selected ? "text-red-600 line-through" : ""
                  }`}
                >
                  {opt}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={restartQuiz}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl shadow-md"
          >
            Restart Quiz
          </button>
        </div>
      </div>
    );

  const q = questions[currentIndex];

  // Circular Timer styles
  const circleStyle = {
    strokeDasharray: 283,
    strokeDashoffset: 283 - (283 * timeLeft) / 10,
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
        <div
          className="bg-blue-500 h-4 rounded-full"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Timer */}
      <div className="flex justify-end items-center mb-4">
        <svg className="w-12 h-12">
          <circle
            r="45"
            cx="50%"
            cy="50%"
            stroke="red"
            strokeWidth="5"
            fill="transparent"
            strokeDasharray="283"
            strokeDashoffset={283 - (283 * timeLeft) / 10}
          />
        </svg>
        <span className="ml-2 font-bold text-red-500 text-lg">{timeLeft}s</span>
      </div>

      {/* Question */}
      <motion.h2
        className="text-2xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {q.question}
      </motion.h2>

      {/* Options */}
      <div className="grid grid-cols-1 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <button
            key={i}
            onClick={() => handleAnswer(i)}
            className={`p-4 rounded-xl text-lg font-medium border transition-all duration-200 
              ${
                showFeedback
                  ? i === q.correct_option
                    ? "bg-green-500 text-white"
                    : i === selected
                    ? "bg-red-500 text-white"
                    : "bg-gray-100"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            disabled={showFeedback}
          >
            {q[`option${i}`]}
          </button>
        ))}
      </div>
    </div>
  );
}
