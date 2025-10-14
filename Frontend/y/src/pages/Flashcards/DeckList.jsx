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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 p-6">
        <header className="flex justify-between items-center mb-6">
        <h1 class="text-5xl font-extrabold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
      StudyHub
    </h1>          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 rounded-lg bg-purple-500 px-3 py-2 text-sm font-medium text-white hover:bg-purple-600 transition"
          >
            <ArrowLeft size={16} /> Back
          </button>
        </header>
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
           My Flashcard Decks
        </h1>
        <p className="text-gray-500">
          Create, manage, and review your study decks efficiently
        </p>
      </div>

      <div className="max-w-2xl mx-auto flex flex-col md:flex-row gap-3 mb-10 bg-white shadow-lg p-4 rounded-xl border border-gray-100">
        <input
          type="text"
          value={newDeck}
          onChange={(e) => setNewDeck(e.target.value)}
          placeholder="Enter deck name..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        />
        <button
          onClick={handleAdd}
          className="flex items-center justify-center gap-2 bg-indigo-600 text-white font-medium px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          <Plus size={18} /> Create Deck
        </button>
      </div>

      <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {deck.length > 0 ? (
          deck.map((deck, index) => (
            <motion.div
              key={deck.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="relative bg-white rounded-2xl shadow-md hover:shadow-xl p-6 cursor-pointer border border-gray-100 hover:-translate-y-1 transition-transform"
            >
              <div className="flex items-center justify-between mb-3">
                <BookOpen className="text-indigo-500" size={24} />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(deck.id);
                  }}
                  className="text-red-400 hover:text-red-600 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* Deck Name */}
              <h3
                onClick={() => navigate(`/flashcards/${deck.id}`)}
                className="text-xl font-semibold text-gray-800 mb-1 hover:text-indigo-600"
              >
                {deck.title}
              </h3>

              <p className="text-sm text-gray-500">
                {deck.card_count || 0} cards
              </p>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 italic">
            No decks yet. Create your first one above!
          </div>
        )}
      </div>
    </div>
  );
};

export default DeckList;
