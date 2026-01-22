import { useState, useEffect } from "react";
import { ArrowLeft, Plus, Layers, BookOpen, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import API from "../../api/api";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom"; 



const CardReview = () => {
  const { deckId } = useParams(); 
  const [cards, setCards] = useState([]);
  const [frontText, setFrontText] = useState("");
  const [backText, setBackText] = useState("");
  const [status, setStatus] = useState("new");
  const navigate = useNavigate();

  useEffect(() => {
    if (deckId) fetchCards();
  }, [deckId]);

  const fetchCards = async () => {
    try {
      const res = await API.get(`flashcards/cards/?deck=${deckId}`);
      setCards(res.data);
    } catch (err) {
      console.error("Error fetching cards:", err);
    }
  };

  const addCard = async () => {
    if (!frontText.trim() || !backText.trim()) return;
    try {
      await API.post("flashcards/cards/", {
        deck: deckId,
        front_text: frontText,
        back_text: backText,
        status,
      });
      setFrontText("");
      setBackText("");
      setStatus("new");
      fetchCards();
    } catch (err) {
      console.error("Error adding card:", err.response?.data);
    }
  };

  const deleteCard = async (cardId) => {
    try {
      await API.delete(`flashcards/cards/${cardId}/`);
      fetchCards();
    } catch (err) {
      console.error("Error deleting card:", err.response?.data);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 pb-32 overflow-x-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center px-6 md:px-8 mb-16 max-w-6xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            StudyHub
          </h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 px-6 py-3 text-white hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 shadow-lg font-semibold"
          >
            <ArrowLeft size={20} /> Back
          </motion.button>
        </motion.header>

        {/* Main Container */}
        <div className="flex justify-center px-6 md:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full max-w-5xl"
          >
            {/* Title */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mb-16"
            >
              <div className="flex items-center gap-3 mb-2">
                <Layers size={32} className="text-purple-600" />
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Deck Cards</h2>
              </div>
              <p className="text-gray-600 text-lg ml-11">Create and manage flashcards for your study deck</p>
            </motion.div>

            {/* Add New Card Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-3xl p-8 shadow-lg mb-12 border border-gray-100"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Plus size={26} className="text-purple-600" />
                Add a New Card
              </h3>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Question (Front)</label>
                  <input
                    type="text"
                    placeholder="Enter the question..."
                    value={frontText}
                    onChange={(e) => setFrontText(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-5 py-3 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition bg-white font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Answer (Back)</label>
                  <input
                    type="text"
                    placeholder="Enter the answer..."
                    value={backText}
                    onChange={(e) => setBackText(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-5 py-3 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition bg-white font-medium"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-5 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition bg-white font-medium"
                  >
                    <option value="new">🆕 New</option>
                    <option value="learning">📘 Learning</option>
                    <option value="mastered">🏆 Mastered</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={addCard}
                    className="w-full md:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-8 py-3 rounded-xl hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 shadow-lg font-bold hover:shadow-xl"
                  >
                    <Plus size={20} /> Add Card
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Cards List */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <BookOpen size={28} className="text-purple-600" />
                {cards.length ? "Your Flashcards" : "No Cards Yet"}
              </h3>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.map((card, idx) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0, 0, 0, 0.08)" }}
                    className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 group relative"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                          card.status === "mastered"
                            ? "bg-green-100 text-green-700"
                            : card.status === "learning"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {card.status}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => deleteCard(card.id)}
                        className="text-red-400 hover:text-red-600 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={18} />
                      </motion.button>
                    </div>

                    <div className="mb-3">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Question</p>
                      <p className="text-lg font-bold text-gray-900">
                        {card.front_text}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Answer</p>
                      <p className="text-base text-gray-700">
                        {card.back_text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {cards.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 font-semibold text-lg">📝 No cards yet. Create your first flashcard above!</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CardReview;
