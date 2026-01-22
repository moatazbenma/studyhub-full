import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, X, Sparkles, Volume2, Minimize2, Maximize2 } from "lucide-react";
import API from "../../api/api";

const PracticeButton = () => {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "ai",
      content:
        "👋 Hey there! I'm StudyHub AI — your English practice partner. Type something to start your conversation!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await API.post("english/practice-english/", { message: input });
      const aiMessage = { role: "ai", content: res.data.reply || "🤔 I didn’t get that. Try again!" };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("Error:", err);
      console.error("Error response:", err.response?.data);
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "⚠️ Something went wrong. Try again later!" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-2xl hover:shadow-purple-400/50 transition-all duration-300"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Bot size={28} />
        </motion.div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className={`fixed z-50 ${minimized ? "bottom-24 right-6" : "bottom-24 right-6"} w-full sm:w-96 ${minimized ? "h-16" : "h-[520px]"} bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden transition-all duration-300`}
            style={{ maxWidth: "calc(100vw - 48px)" }}
          >
            {/* Header */}
            <motion.div 
              className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white p-4 font-semibold flex justify-between items-center flex-shrink-0"
              layoutId="chat-header"
            >
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Sparkles className="w-5 h-5 text-yellow-300" />
                </motion.div>
                <span>StudyHub AI Assistant</span>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setMinimized(!minimized)}
                  className="text-white hover:bg-white/20 p-1 rounded-lg transition"
                  title={minimized ? "Maximize" : "Minimize"}
                >
                  {minimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setOpen(false)}
                  className="text-white hover:bg-white/20 p-1 rounded-lg transition"
                >
                  <X size={20} />
                </motion.button>
              </div>
            </motion.div>

            {/* Messages */}
            {!minimized && (
              <motion.div 
                className="flex-1 p-4 overflow-y-auto text-gray-700 space-y-4 bg-gradient-to-b from-white via-purple-50/30 to-indigo-50/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`p-3 px-4 rounded-2xl max-w-[75%] text-sm leading-relaxed shadow-md ${
                        m.role === "user"
                          ? "bg-gradient-to-br from-purple-500 to-indigo-500 text-white rounded-br-none"
                          : "bg-gradient-to-br from-gray-100 to-gray-50 text-gray-900 border border-gray-200 rounded-bl-none"
                      }`}
                    >
                      {m.content}
                    </motion.div>
                  </motion.div>
                ))}

                {loading && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center space-x-2 text-gray-500 text-sm ml-2"
                  >
                    <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 0.6, repeat: Infinity }} className="w-2 h-2 bg-purple-500 rounded-full" />
                    <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }} className="w-2 h-2 bg-indigo-500 rounded-full" />
                    <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} className="w-2 h-2 bg-blue-500 rounded-full" />
                  </motion.div>
                )}
                <div ref={chatEndRef} />
              </motion.div>
            )}

            {/* Input */}
            {!minimized && (
              <motion.div 
                className="p-4 border-t border-gray-200 flex gap-2 bg-white flex-shrink-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.input
                  type="text"
                  placeholder="Ask me anything..."
                  className="flex-1 border-2 border-gray-200 focus:border-purple-500 rounded-xl px-4 py-2 text-sm focus:outline-none transition-all"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  whileFocus={{ scale: 1.02 }}
                />
                <motion.button
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-5 py-2 rounded-xl hover:shadow-lg transition-all flex items-center gap-1 font-semibold ${
                    loading || !input.trim() ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                >
                  <Send size={18} />
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PracticeButton;
