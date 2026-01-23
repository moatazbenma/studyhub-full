import React, { useState } from "react";
import { motion } from "framer-motion";
import API from "../../api/api";
import { ArrowLeft, BookOpen, Volume2, HelpCircle, MessageSquare } from "lucide-react";

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
      if (refreshDashboard) refreshDashboard();
    } catch (err) {
      console.error("Failed to update English progress:", err);
    }
  };

  const backToLevels = () => {
    setSelectedLevel(null);
    setSelectedLesson(null);
    setCurrentStep(0);
    setCompletedSteps([]);
  };

  const nextStep = () => {
    if (currentStep < selectedLesson.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setShowTranscript(false);
      setQuizScore(null);
      setUserAnswers({});
      setUserWriting("");
      markComplete();
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setShowTranscript(false);
      setQuizScore(null);
      setUserAnswers({});
      setUserWriting("");
    }
  };

  const toggleTranscript = () => {
    setShowTranscript(!showTranscript);
  };

  const markComplete = () => {
    if (!selectedLesson || selectedLesson.id == null) {
      return;
    }
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
      updateEnglishProgress(selectedLesson.id, currentStep);
    }
  };

  const submitQuiz = () => {
    if (!selectedLesson || selectedLesson.id == null) {
      alert("Lesson ID is missing!");
      return;
    }
    let score = 0;
    const step = selectedLesson.steps[currentStep];
    step.content.forEach((q, i) => {
      if (userAnswers[i] === q.answer) score++;
    });
    setQuizScore(score);
    updateEnglishProgress(selectedLesson.id, currentStep, score);
  };

  if (!selectedLevel) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 pb-32 overflow-x-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 flex justify-center px-6 md:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-5xl"
          >
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-16 text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">Select Your Level</h1>
              <p className="text-lg text-gray-600">Choose your English proficiency level to get started</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {levels.map((lvl, idx) => (
                <motion.button
                  key={lvl.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)" }}
                  onClick={() => setSelectedLevel(lvl)}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 text-center border border-gray-100 transition-all duration-300 group"
                >
                  <BookOpen size={40} className="mx-auto mb-4 text-purple-600 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{lvl.level}</h3>
                  <p className="text-gray-600 text-sm">{lvl.lessons.length} lessons</p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!selectedLesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 pb-32 overflow-x-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 flex justify-center px-6 md:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-5xl"
          >
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-16 text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{selectedLevel.level} Lessons</h1>
              <p className="text-gray-600 text-lg">Select a lesson to start learning</p>
            </motion.div>

            <div className="space-y-4 mb-8">
              {selectedLevel.lessons.map((lesson, idx) => (
                <motion.button
                  key={lesson.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ x: 8, boxShadow: "0 12px 24px rgba(0, 0, 0, 0.08)" }}
                  onClick={() => setSelectedLesson(lesson)}
                  className="w-full text-left bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 border border-gray-100 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-purple-100 to-indigo-100 p-3 rounded-xl group-hover:scale-110 transition-transform">
                      <BookOpen size={24} className="text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">{lesson.title}</h3>
                      <p className="text-gray-600 text-sm">{lesson.steps.length} steps</p>
                    </div>
                    <ArrowLeft size={20} className="text-gray-400 transform rotate-180 group-hover:translate-x-2 transition-transform" />
                  </div>
                </motion.button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedLevel(null)}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 px-6 py-3 text-white hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 shadow-lg font-semibold"
            >
              <ArrowLeft size={20} /> Back to Levels
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  const step = selectedLesson.steps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 pb-32 overflow-x-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 flex justify-center px-6 md:px-8">
        <div className="w-full max-w-5xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-between items-center mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={backToLevels}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 px-6 py-3 text-white hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 shadow-lg font-semibold"
            >
              <ArrowLeft size={20} /> Back
            </motion.button>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{selectedLesson.title}</h1>
            <div className="w-24"></div>
          </motion.div>

          {/* Progress */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 bg-white rounded-xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold text-gray-900">Progress</span>
              <span className="text-sm font-semibold text-purple-600">{completedSteps.length} / {selectedLesson.steps.length} completed</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(completedSteps.length / selectedLesson.steps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-purple-500 to-indigo-500 h-3 rounded-full"
              ></motion.div>
            </div>
          </motion.div>

          {/* Lesson Content */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              {step.type === "video" && <Volume2 size={28} className="text-purple-600" />}
              {step.type === "vocabulary" && <BookOpen size={28} className="text-blue-600" />}
              {step.type === "quiz" && <HelpCircle size={28} className="text-yellow-600" />}
              {step.type === "discussion" && <MessageSquare size={28} className="text-green-600" />}
              <h2 className="text-2xl font-bold text-gray-900">{step.title}</h2>
            </div>

            {step.type === "video" && (
              <div className="flex flex-col items-center">
                <iframe
                  width="100%"
                  height="400"
                  src={step.content}
                  title={step.title}
                  className="rounded-xl shadow-md mb-6"
                  frameBorder="0"
                  allowFullScreen
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleTranscript}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 shadow-lg font-semibold"
                >
                  {showTranscript ? "Hide Transcript" : "Show Transcript"}
                </motion.button>
                {showTranscript && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 bg-gray-50 p-6 rounded-xl shadow border border-gray-200 max-w-xl text-gray-700 whitespace-pre-line w-full"
                  >
                    <h3 className="font-bold text-lg text-gray-900 mb-3">Transcript</h3>
                    <p className="text-base leading-relaxed">{step.transcript}</p>
                  </motion.div>
                )}
              </div>
            )}

            {step.type === "vocabulary" && (
              <div className="space-y-3">
                {step.content.map((word, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200"
                  >
                    <p className="text-lg font-semibold text-gray-900">{word}</p>
                  </motion.div>
                ))}
              </div>
            )}

            {step.type === "quiz" && (
              <div className="space-y-6">
                {step.content.map((q, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-gray-50 p-6 rounded-xl border border-gray-200"
                  >
                    <p className="font-bold text-lg text-gray-900 mb-4">{q.question}</p>
                    <div className="space-y-3">
                      {q.options.map((opt, j) => (
                        <label key={j} className="flex items-center gap-3 cursor-pointer group">
                          <input
                            type="radio"
                            name={`quiz-${i}`}
                            checked={userAnswers[i] === j + 1}
                            onChange={() => setUserAnswers({ ...userAnswers, [i]: j + 1 })}
                            className="w-4 h-4"
                          />
                          <span className="text-base text-gray-700 group-hover:text-gray-900 transition">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </motion.div>
                ))}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={submitQuiz}
                  className="w-full px-6 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 shadow-lg font-bold text-lg"
                >
                  Submit Quiz
                </motion.button>
                {quizScore !== null && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 bg-green-50 border-2 border-green-500 rounded-xl text-gray-900 text-center"
                  >
                    <p className="text-2xl font-bold">🎉 Great Job!</p>
                    <p className="text-lg mt-2">You got <span className="font-bold text-green-600">{quizScore}</span> out of <span className="font-bold">{step.content.length}</span> correct</p>
                  </motion.div>
                )}
              </div>
            )}

            {step.type === "discussion" && (
              <div>
                <textarea
                  placeholder={step.content}
                  value={userWriting}
                  onChange={(e) => setUserWriting(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-xl p-5 mt-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition text-base font-medium"
                  rows={6}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={async () => {
                    if (!userWriting.trim()) return alert("Please write something first.");
                    setLoading(true);
                    setWritingFeedback(null);
                    try {
                      const res = await API.post("english/correct-writing", { text: userWriting });
                      setWritingFeedback(res.data);
                    } catch (err) {
                      alert("Error connecting to feedback service: " + (err.response?.data?.error || err.message));
                    } finally {
                      setLoading(false);
                    }
                  }}
                  className="mt-6 w-full px-6 py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl hover:from-green-600 hover:to-teal-600 transition-all duration-300 shadow-lg font-bold text-lg"
                >
                  {loading ? "Checking... ⏳" : "Check My Writing ✓"}
                </motion.button>
                {writingFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 bg-green-50 border-2 border-green-500 rounded-xl p-6 text-gray-900"
                  >
                    <h3 className="font-bold text-lg text-gray-900 mb-4">✨ AI Feedback</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold text-gray-700 mb-2">Feedback:</p>
                        <p className="text-gray-700 bg-white p-3 rounded-lg">{writingFeedback.feedback}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700 mb-2">Corrected Text:</p>
                        <p className="text-gray-700 bg-white p-3 rounded-lg italic">{writingFeedback.corrected}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>

          {/* Navigation Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-between items-center pt-8 border-t border-gray-200"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={previousStep}
              disabled={currentStep === 0}
              className="flex items-center gap-2 rounded-xl bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 text-gray-900 transition-all duration-300 font-semibold"
            >
              <ArrowLeft size={20} /> Previous
            </motion.button>

            <div className="flex gap-2">
              {selectedLesson.steps.map((_, i) => (
                <motion.div
                  key={i}
                  className={`h-2 rounded-full transition-all ${i === currentStep ? "bg-gradient-to-r from-purple-500 to-indigo-500 w-8" : i < currentStep ? "bg-green-500 w-6" : "bg-gray-300 w-6"}`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextStep}
              disabled={currentStep === selectedLesson.steps.length - 1}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 text-white transition-all duration-300 shadow-lg font-semibold"
            >
              Next <ArrowLeft size={20} className="transform rotate-180" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EnglishLessonCards;
