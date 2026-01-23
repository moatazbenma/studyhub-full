import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Zap,
  UserRoundPen,
  Target,
  Handshake,
  Trophy,
  Loader2,
} from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import API from "../../api/api";
import "react-circular-progressbar/dist/styles.css";
import PracticeButton from "../Button/PracticeButton";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingStatus, setBookingStatus] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);

  const handleProfile = () => navigate("/profile");

  // --- Fetch dashboard data ---
  const fetchDashboard = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const res = await API.get("dashboard/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(res.data);
    } catch (err) {
      console.error("Error fetching dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [navigate]);

  // --- Book class ---
  const handleBookClass = async () => {
    if (!selectedSlot) {
      setBookingStatus({ error: "Please select a time slot first." });
      return;
    }
    try {
      setBookingLoading(true);
      const token = localStorage.getItem("token");
      await API.post(
        "bookings/book/",
        { slot: selectedSlot },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBookingStatus({ success: "✅ Class booked successfully!" });
      setSelectedSlot(null);
      fetchDashboard(); // refresh dashboard after booking
    } catch {
      setBookingStatus({ error: "❌ Failed to book class. Try again." });
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center text-gray-500 text-xl">
        Loading dashboard...
      </div>
    );

  if (!data)
    return (
      <div className="flex h-screen items-center justify-center text-red-500 text-xl">
        Failed to load dashboard. Please login again.
      </div>
    );

  // --- Dashboard Values ---
  const username = data?.username || "Learner";
  const tasksProgress = data?.tasks_progress || 0;
  const flashcardsProgress = data?.flashcards_progress || 0;
  const englishProgress = data?.english_progress || 0;

  const quoteList = [
    "Keep learning — your future self will thank you.",
    "Small progress each day adds up to big results.",
    "Learning never exhausts the mind.",
  ];
  const randomQuote = quoteList[Math.floor(Math.random() * quoteList.length)];

  const features = [
    {
      icon: <Zap size={20} />,
      title: "To-Do List",
      desc: data?.tasks?.length
        ? `You have ${data.tasks.length} tasks, ${
            data.tasks_completed?.length || 0
          } completed.`
        : "No tasks yet.",
      progress: tasksProgress,
      link: "/todos",
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: <Target size={20} />,
      title: "Flashcards",
      desc: data?.cards_mastered
        ? `Mastered ${data.cards_mastered} of ${
            (data.cards_mastered || 0) + (data.cards_learning || 0)
          } cards.`
        : "No flashcards yet.",
      progress: flashcardsProgress,
      link: "/flashcards",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Handshake size={20} />,
      title: "English Lessons",
      desc: `Completed ${data?.english_progress || 0}% of lessons.`,
      progress: englishProgress,
      link: "/english",
      color: "from-green-500 to-teal-500",
    },
  ];

  const availableSlots = [
    "Mon, 7 Oct - 5 PM",
    "Wed, 9 Oct - 3 PM",
    "Fri, 11 Oct - 4 PM",
  ];

  const getBadge = (index) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6 overflow-x-hidden">
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
          className="flex justify-between items-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            StudyHub
          </h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleProfile}
            className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 px-8 py-4 text-white hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 shadow-lg font-semibold text-lg"
          >
            <UserRoundPen size={28} />
            <span className="hidden md:inline">Profile</span>
          </motion.button>
        </motion.header>

        {/* Welcome */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 p-8 text-white shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-300/20"
        >
          <h2 className="text-3xl font-bold">
            Welcome back, {username}! 👋
          </h2>
          <p className="mt-3 opacity-90 italic text-lg">{randomQuote}</p>
        </motion.div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {features.map(({ icon, title, desc, progress, link, color }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)" }}
              className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
            >
              <div
                className={`absolute top-0 right-0 h-24 w-24 rounded-full bg-gradient-to-br ${color} opacity-20 blur-3xl group-hover:opacity-30 transition duration-300`}
              ></div>

              <div className="flex items-center gap-3 mb-4">
                <motion.div 
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-purple-100 to-indigo-100 text-indigo-600 shadow-md"
                >
                  {icon}
                </motion.div>
                <h3 className="text-lg font-bold text-gray-900">{title}</h3>
              </div>

              <p className="text-gray-700 mb-4 text-sm font-medium">{desc}</p>

              <div className="flex justify-center mb-6">
                <div className="w-24">
                  <CircularProgressbar
                    value={progress}
                    text={`${progress}%`}
                    strokeWidth={6}
                    styles={buildStyles({
                      textSize: "22px",
                      pathColor: `url(#colorful)`,
                      textColor: "#6366f1",
                      trailColor: "#e5e7eb",
                      rotation: 0.25,
                    })}
                  />
                </div>
              </div>

              <Link
                to={link}
                className="block text-center w-full rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 px-4 py-3 text-white font-bold hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Open
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Leaderboard & Booking */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Leaderboard */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-1"
          >
            <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 py-4 px-6 flex items-center gap-3">
                <Trophy className="text-white w-6 h-6" />
                <h2 className="text-lg font-bold text-white">
                  Top Learners
                </h2>
              </div>

              <ul className="divide-y divide-gray-200">
                {data?.leaderboard?.slice(0, 5).map((user, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center py-4 px-6 hover:bg-purple-50/50 transition duration-300"
                  >
                    <span className="text-2xl mr-3 w-8">
                      {getBadge(index)}
                    </span>
                    <span className="text-gray-700 text-sm font-bold mr-2">
                      {index + 1}.
                    </span>
                    <img
                      className="w-10 h-10 rounded-full object-cover mr-4 border-2 border-purple-200 shadow-md"
                      src={
                        user.profile_image_url ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          user.username
                        )}&background=random`
                      }
                      alt={user.username}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-gray-900 truncate">
                        {user.username}
                      </h3>
                      <p className="text-purple-600 text-sm font-semibold">
                        {user.score} pts 
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Booking */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-2"
          >
            <div className="bg-white shadow-lg rounded-2xl p-8 flex flex-col gap-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Book a Live Class
                </h2>
              </div>

              <p className="text-gray-700 text-base font-medium">
                Schedule a live English session with our tutors.
              </p>

              <div className="flex flex-wrap gap-3">
                {availableSlots.map((slot, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-5 py-3 rounded-full text-sm font-bold cursor-pointer transition-all border-2 ${
                      selectedSlot === slot
                        ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-purple-500 shadow-lg"
                        : "bg-gray-50 text-gray-800 hover:bg-gray-100 border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedSlot(slot)}
                  >
                    {slot}
                  </motion.div>
                ))}
              </div>

              {bookingStatus?.success && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-600 mt-2 animate-pulse font-semibold text-base"
                >
                  {bookingStatus.success}
                </motion.p>
              )}
              {bookingStatus?.error && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-600 mt-2 font-semibold text-base"
                >
                  {bookingStatus.error}
                </motion.p>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBookClass}
                disabled={bookingLoading}
                className="w-full md:w-1/2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold py-4 rounded-xl shadow-lg hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 mt-4 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {bookingLoading ? <Loader2 className="animate-spin w-5 h-5" /> : "Book Now"}
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center text-gray-600 text-sm border-t border-gray-200 pt-6 font-medium"
        >
          © 2025 <span className="font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">StudyHub</span> — Learn. Practice. Grow.
        </motion.footer>

      <PracticeButton />
      </div>
    </div>
  );
};

export default DashboardPage;
