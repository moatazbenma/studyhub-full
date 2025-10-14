import { useState, useEffect } from "react";
import { ArrowLeft, Plus, Layers, BookOpen } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Decks</span>
        </button>

        <div className="flex items-center gap-2 text-indigo-600 font-semibold">
          <Layers size={22} />
          <h2 className="text-xl">Deck Cards</h2>
        </div>
      </div>

      {/* Add New Card Section */}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-8 hover:shadow-lg transition">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Plus size={18} className="text-indigo-500" />
          Add a New Card
        </h3>

        <div className="grid md:grid-cols-3 gap-3 mb-4">
          <input
            type="text"
            placeholder="Front text (Question)"
            value={frontText}
            onChange={(e) => setFrontText(e.target.value)}
            className="border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="text"
            placeholder="Back text (Answer)"
            value={backText}
            onChange={(e) => setBackText(e.target.value)}
            className="border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="new">🆕 New</option>
            <option value="learning">📘 Learning</option>
            <option value="mastered">🏆 Mastered</option>
          </select>
        </div>

        <button
          onClick={addCard}
          className="w-full md:w-auto flex items-center justify-center gap-2 bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition-all duration-300"
        >
          <Plus size={18} /> Add Card
        </button>
      </div>

      {/* Cards List */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <BookOpen size={20} className="text-indigo-500" />
          {cards.length ? "Your Flashcards" : "No Cards Yet"}
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 relative"
            >
              <span
                className={`absolute top-3 right-3 text-xs px-2 py-1 rounded-full ${
                  card.status === "mastered"
                    ? "bg-green-100 text-green-700"
                    : card.status === "learning"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {card.status}
              </span>

              <div className="mb-2 text-indigo-600 font-semibold">
                Q: {card.front_text}
              </div>
              <p className="text-gray-700 mb-4">A: {card.back_text}</p>

              <div className="flex justify-end">
                <button className="text-sm text-indigo-500 hover:text-indigo-700 font-medium">
                  Review
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardReview;
