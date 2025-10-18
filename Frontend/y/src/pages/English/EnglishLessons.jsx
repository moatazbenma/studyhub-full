import React, { useState } from "react";
import { motion } from "framer-motion";
import API from "../../api/api";
import { ArrowLeft } from "lucide-react";

import { Beginner } from "./Beginner";
import { LowIntermediate } from "./LowIntermediate";
import { Intermediate } from "./Intermediate";
import { HighIntermediate } from "./HighIntermediate";

const levels = [
  { id: 1, level: "Beginner", lessons: Beginner },
  { id: 2, level: "Low Intermediate", lessons: LowIntermediate },
  { id: 3, level: "Intermediate", lessons: Intermediate },
  { id: 4, level: "High Intermediate", lessons: HighIntermediate },
];

const EnglishLessonCards = ({ refreshDashboard }) => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [showTranscript, setShowTranscript] = useState(false);

  const [userWriting, setUserWriting] = useState("");
  const [writingFeedback, setWritingFeedback] = useState(null);
  const [loading, setLoading] = useState(false);

  const [userAnswers, setUserAnswers] = useState({});
  const [quizScore, setQuizScore] = useState(null);

  const updateEnglishProgress = async (lessonId, step, score = 0) => {
    try {
      const token = localStorage.getItem("token");
      await API.post(
        "dashboard/update-progress/",
        { lesson_id: lessonId, step, quiz_score: score },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (refreshDashboard) refreshDashboard(); // optional callback to refresh dashboard
    } catch (err) {
      console.error("Failed to update English progress:", err);
    }
  };

  if (!selectedLevel) {
 return (
  <div className="">

    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-white p-6">

      <h1 className="text-3xl font-bold text-gray-800 mb-6">Select Your Level</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {levels.map((lvl) => (
          <button
            key={lvl.id}
            onClick={() => setSelectedLevel(lvl)}
            className="p-4 bg-white rounded-2xl shadow hover:shadow-lg hover:bg-indigo-50 transition text-gray-800 font-medium"
          >
            {lvl.level}
          </button>
        ))}
      </div>
    </div>
  </div>
);
  }


  if (!selectedLesson) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-white p-6">
        <h1 className="text-2xl font-bold mb-4">{selectedLevel.level} Lessons</h1>
        <div className="space-y-3 w-full max-w-md">
          {selectedLevel.lessons.map((l) => (
            <button
              key={l.id}
              onClick={() => setSelectedLesson(l)}
              className="block w-full text-left p-4 bg-white rounded-xl shadow hover:bg-indigo-50 transition"
            >
              {l.title}
            </button>
          ))}
        </div>
        <button
          onClick={() => setSelectedLevel(null)}
          className="flex mt-4 items-center gap-2 rounded-lg bg-[#615EFF] px-3 py-2 text-sm font-medium text-white hover:bg-purple-600 transition"
        >
          ← Back to Levels
        </button>
      </div>
    );
  }

  const step = selectedLesson.steps[currentStep];

const markComplete = () => {
  if (!selectedLesson || selectedLesson.id == null) {
    alert("Lesson ID is missing!");
    return;
  }
  if (!completedSteps.includes(currentStep)) {
    setCompletedSteps([...completedSteps, currentStep]);
    updateEnglishProgress(selectedLesson.id, currentStep); // backend update
  }
};

const submitQuiz = () => {
  if (!selectedLesson || selectedLesson.id == null) {
    alert("Lesson ID is missing!");
    return;
  }
  let score = 0;
  step.content.forEach((q, i) => {
    if (userAnswers[i] === q.answer) score++;
  });
  setQuizScore(score);
  updateEnglishProgress(selectedLesson.id, currentStep, score);
};


  const nextStep = () => {
    setShowTranscript(false);
    if (currentStep < selectedLesson.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // finish lesson
      setSelectedLesson(null);
      setCurrentStep(0);
      setCompletedSteps([]);
      setShowTranscript(false);
      setUserWriting("");
      setWritingFeedback(null);
      setUserAnswers({});
      setQuizScore(null);
    }
  };

  const prevStep = () => {
    setShowTranscript(false);
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const toggleTranscript = () => setShowTranscript(!showTranscript);

  const backToLevels = () => {
    setSelectedLevel(null);
    setSelectedLesson(null);
    setCurrentStep(0);
    setCompletedSteps([]);
    setShowTranscript(false);
    setUserWriting("");
    setWritingFeedback(null);
    setUserAnswers({});
    setQuizScore(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 p-6">

      <div className="max-w-4xl mx-auto space-y-6">
        <button
          onClick={backToLevels}
          className="flex mt-4 items-center gap-2 rounded-lg bg-[#615EFF] px-3 py-2 text-sm font-medium text-white hover:bg-purple-600 transition"
        >
          ← Back to Levels
        </button>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">{selectedLesson.title}</h1>

        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl shadow-lg border border-gray-100 bg-white"
        >
          <h2 className="text-xl font-semibold mb-3">{step.title}</h2>

          {step.type === "video" && (
            <div className="flex flex-col items-center">
              <iframe
                width="100%"
                height="300"
                src={step.content}
                title={step.title}
                className="rounded-xl shadow-md"
                frameBorder="0"
                allowFullScreen
              />
              <button
                onClick={toggleTranscript}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
              >
                {showTranscript ? "Hide Transcript" : "Show Transcript"}
              </button>
              {showTranscript && (
                <div className="mt-4 bg-gray-50 p-4 rounded-xl shadow max-w-xl text-gray-700 whitespace-pre-line">
                  <h2 className="font-semibold mb-2">Transcript</h2>
                  <p>{step.transcript}</p>
                </div>
              )}
            </div>
          )}

          {step.type === "vocabulary" && (
            <ul className="list-disc pl-5 space-y-1">
              {step.content.map((word, i) => (
                <li key={i}>{word}</li>
              ))}
            </ul>
          )}

          {step.type === "quiz" && (
            <div>
              {step.content.map((q, i) => (
                <div key={i} className="mt-3">
                  <p className="font-medium">{q.question}</p>
                  {q.options.map((opt, j) => (
                    <label key={j} className="block cursor-pointer">
                      <input
                        type="radio"
                        className="mr-2"
                        name={`quiz-${i}`}
                        checked={userAnswers[i] === j + 1}
                        onChange={() => setUserAnswers({ ...userAnswers, [i]: j + 1 })}
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              ))}
              <button
                onClick={submitQuiz}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
              >
                Submit Quiz
              </button>
              {quizScore !== null && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-gray-700">
                  You got <strong>{quizScore}</strong> / {step.content.length} correct 🎉
                </div>
              )}
            </div>
          )}

          {step.type === "discussion" && (
            <div className="mt-4">
              <textarea
                placeholder={step.content}
                value={userWriting}
                onChange={(e) => setUserWriting(e.target.value)}
                className="w-full border rounded-lg p-2 mt-2 focus:ring-2 focus:ring-indigo-500"
                rows={4}
              />
              <button
                onClick={async () => {
                  if (!userWriting.trim()) return alert("Please write something first.");
                  setLoading(true);
                  setWritingFeedback(null);
                  try {
                    const res = await fetch("https://studyhub-full.onrender.com/api/english/correct-writing", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ text: userWriting }),
                    });
                    const data = await res.json();
                    setWritingFeedback(data);
                  } catch (err) {
                    alert("Error connecting to AI feedback service.");
                  } finally {
                    setLoading(false);
                  }
                }}
                className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
              >
                {loading ? "Checking..." : "Check My Writing"}
              </button>
              {writingFeedback && (
                <motion.div
                  className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4 text-gray-800"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <h3 className="font-semibold text-lg mb-2">AI Feedback ✨</h3>
                  <p className="mb-2">
                    <strong>Feedback:</strong> {writingFeedback.feedback}
                  </p>
                  <p>
                    <strong>Corrected Text:</strong> {writingFeedback.corrected}
                  </p>
                </motion.div>
              )}
            </div>
          )}

          {!completedSteps.includes(currentStep) && (
            <button
              onClick={markComplete}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
            >
              Mark as Completed
            </button>
          )}
        </motion.div>

        <div className="flex justify-between mt-4">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="px-4 py-2 bg-gray-300 rounded-xl hover:bg-gray-400 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={nextStep}
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
          >
            {currentStep === selectedLesson.steps.length - 1 ? "Finish Lesson" : "Next"}
          </button>
        </div>

        <div className="mt-4 text-gray-600">
          Progress: {completedSteps.length} / {selectedLesson.steps.length} steps completed
        </div>
      </div>
    </div>
  );
};

export default EnglishLessonCards;
