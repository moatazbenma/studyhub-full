import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
          StudyHub
        </h1>
        <button
          onClick={handleProfile}
          className="flex items-center gap-2 rounded-lg bg-purple-500 px-4 py-2 text-white hover:bg-purple-600 transition-all duration-300"
        >
          <UserRoundPen size={24} />
          <span className="hidden md:inline text-sm font-medium">Profile</span>
        </button>
      </header>

      {/* Welcome */}
      <div className="mb-8 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 p-8 text-white shadow-lg hover:scale-[1.02] transition-all duration-300">
        <h2 className="text-2xl font-semibold">
          Welcome back, {username}! 👋
        </h2>
        <p className="mt-2 opacity-90 italic">{randomQuote}</p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {features.map(({ icon, title, desc, progress, link, color }, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div
              className={`absolute top-0 right-0 h-24 w-24 rounded-full bg-gradient-to-br ${color} opacity-20 blur-3xl`}
            ></div>

            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-indigo-600">
                {icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            </div>

            <p className="text-gray-600 mb-4 text-sm">{desc}</p>

            <div className="flex justify-center mb-4">
              <div className="w-20">
                <CircularProgressbar
                  value={progress}
                  text={`${progress}%`}
                  strokeWidth={8}
                  styles={buildStyles({
                    textSize: "26px",
                    pathColor: `#6366f1`,
                    textColor: "#4B5563",
                    trailColor: "#E5E7EB",
                  })}
                />
              </div>
            </div>

            <Link
              to={link}
              className="block text-center w-full rounded-lg bg-indigo-500 px-4 py-2 text-white font-medium hover:bg-indigo-600 transition-colors duration-300"
            >
              Open
            </Link>
          </div>
        ))}
      </div>

      {/* Leaderboard & Booking */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {/* Leaderboard */}
        <div className="md:col-span-1">
          <div className="bg-white shadow-md rounded-2xl overflow-hidden">
            <div className="bg-gray-100 py-2 px-4 flex items-center gap-2">
              <Trophy className="text-yellow-500" />
              <h2 className="text-lg font-semibold text-gray-800">
                Top Learners
              </h2>
            </div>

            <ul className="divide-y divide-gray-200">
              {data?.leaderboard?.slice(0, 5).map((user, index) => (
                <li key={index} className="flex items-center py-4 px-6">
                  <span className="text-gray-700 text-base font-medium mr-3">
                    {getBadge(index)} {index + 1}.
                  </span>
                  <img
                    className="w-10 h-10 rounded-full object-cover mr-4 border border-gray-300"
                    src={
                      user.profile_image_url ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user.username
                      )}&background=random`
                    }
                    alt={user.username}
                  />
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-800 truncate">
                      {user.username}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {user.score} pts 
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Booking */}
        <div className="md:col-span-2">
          <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col gap-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                Book a Live Class
              </h2>
            </div>

            <p className="text-gray-600 text-sm md:text-base">
              Schedule a live English session with our tutors.
            </p>

            <div className="flex flex-wrap gap-3">
              {availableSlots.map((slot, i) => (
                <div
                  key={i}
                  className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-all ${
                    selectedSlot === slot
                      ? "bg-indigo-500 text-white shadow-md"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                  onClick={() => setSelectedSlot(slot)}
                >
                  {slot}
                </div>
              ))}
            </div>

            {bookingStatus?.success && (
              <p className="text-green-600 mt-2 animate-pulse">
                {bookingStatus.success}
              </p>
            )}
            {bookingStatus?.error && (
              <p className="text-red-600 mt-2">{bookingStatus.error}</p>
            )}

            <button
              onClick={handleBookClass}
              disabled={bookingLoading}
              className="w-full md:w-1/2 bg-indigo-500 text-white font-semibold py-3 rounded-xl shadow-sm hover:bg-indigo-600 transition-all duration-300 mt-4 flex items-center justify-center"
            >
              {bookingLoading ? <Loader2 className="animate-spin mr-2" /> : "Book Now"}
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center text-gray-500 text-sm border-t border-gray-200 pt-4">
        © 2025 <span className="font-semibold text-indigo-500">StudyHub</span> — Learn. Practice. Grow.
      </footer>

      <PracticeButton />
    </div>
  );
};

export default DashboardPage;
