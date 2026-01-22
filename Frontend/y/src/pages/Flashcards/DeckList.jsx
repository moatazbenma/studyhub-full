import { useState, useEffect } from "react";
import { Plus, Trash2, BookOpen, ArrowLeft } from "lucide-react";
import API from "../../api/api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const DeckList = () => {
  const [deck, setDecks] = useState([]);
  const [newDeck, setNewDeck] = useState("");
  const navigate = useNavigate();

  const fetchDecks = async () => {
    try {
      const res = await API.get("flashcards/decks/");
      setDecks(res.data);
    } catch (err) {
      console.error("Error fetching decks:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchDecks();
  }, []);

  const handleAdd = async () => {
    if (!newDeck.trim()) return;
    try {
      await API.post("flashcards/decks/", { title: newDeck });
      setNewDeck("");
      fetchDecks();
    } catch (err) {
      console.error("Error adding deck:", err.response?.data || err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`flashcards/decks/${id}/`);
      fetchDecks();
    } catch (err) {
      console.error("Error deleting deck:", err.response?.data || err.message);
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
            onClick={() => navigate("/dashboard")}
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
            {/* Title Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mb-16 text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                My Flashcard Decks
              </h2>
              <p className="text-lg text-gray-600">
                Create, manage, and review your study decks efficiently
              </p>
            </motion.div>

            {/* Add New Deck Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-3xl p-8 shadow-lg mb-12 border border-gray-100"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Plus size={26} className="text-purple-600" />
                Create New Deck
              </h3>
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  value={newDeck}
                  onChange={(e) => setNewDeck(e.target.value)}
                  placeholder="Enter deck name..."
                  className="flex-1 border border-gray-300 rounded-xl px-5 py-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition bg-white font-medium"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdd}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold px-8 py-4 rounded-xl hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 shadow-lg whitespace-nowrap hover:shadow-xl"
                >
                  <Plus size={20} /> Create Deck
                </motion.button>
              </div>
            </motion.div>

            {/* Decks Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              {deck.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {deck.map((d, index) => (
                    <motion.div
                      key={d.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)" }}
                      onClick={() => navigate(`/flashcards/${d.id}`)}
                      className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl p-7 cursor-pointer border border-gray-100 transition-all duration-300 group"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          className="bg-gradient-to-br from-purple-100 to-indigo-100 p-3 rounded-xl"
                        >
                          <BookOpen size={28} className="text-purple-600" />
                        </motion.div>
                        <motion.button
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(d.id);
                          }}
                          className="text-red-400 hover:text-red-600 transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 size={20} />
                        </motion.button>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                        {d.title}
                      </h3>

                      <div className="flex items-center gap-2 text-gray-600">
                        <BookOpen size={16} className="text-purple-500" />
                        <span className="font-semibold">{d.card_count || 0} cards</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500 font-semibold text-lg">📝 No decks yet. Create your first one above!</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DeckList;
