import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../../api/api";
import { useNavigate } from "react-router-dom";
import { LogOut, Trash2, User, Mail, Lock, BookOpen, Calendar, CheckCircle2 } from "lucide-react";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ username: "", email: "", bio: "" });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ message: "", type: "" });
  const [passwordForm, setPasswordForm] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [bookings, setBookings] = useState([]);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
    fetchBookings();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("auth/profile/", { headers: { Authorization: `Bearer ${token}` } });
      setProfile(res.data);
      setForm({
        username: res.data.username || "",
        email: res.data.email || "",
        bio: res.data.bio || "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await API.get("bookings/my-bookings/", { headers: { Authorization: `Bearer ${token}` } });
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getFullImageUrl = (url) => {
    if (!url) return "https://via.placeholder.com/150";
    if (url.startsWith('http')) return url;
    // If it's a relative URL, prepend the backend base URL
    return `http://localhost:8000${url}`;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Image selected:", file.name);
      setImage(file);
      const reader = new FileReader();
      reader.onload = (event) => setPreview(event.target.result);
      reader.readAsDataURL(file);
    }
  };
  const handlePasswordChange = (e) => setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("username", form.username);
    formData.append("email", form.email);
    formData.append("bio", form.bio);
    if (image) {
      console.log("Uploading image:", image.name, "Size:", image.size, "Type:", image.type);
      formData.append("profile_image", image);
    }

    try {
      const res = await API.post("auth/profile/update/", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Profile update response:", res.data);
      console.log("Image URL:", res.data.profile_image_url);
      console.log("Profile Image Field:", res.data.profile_image);
      
      setProfile(res.data);
      setImage(null);
      setPreview(null);
      // Force re-fetch to ensure fresh data
      setTimeout(() => {
        fetchProfile();
      }, 500);
      
      setStatus({ message: "✅ Profile updated successfully!", type: "success" });
      setTimeout(() => setStatus({ message: "", type: "" }), 2500);
    } catch (error) {
      console.error("Profile update error:", error.response?.data || error.message);
      setStatus({ message: "❌ Failed to update profile.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordForm.new_password !== passwordForm.confirm_password) {
      setStatus({ message: "⚠️ New passwords do not match!", type: "error" });
      return;
    }
    try {
      await API.post(
        "auth/password/change/",
        { old_password: passwordForm.old_password, new_password: passwordForm.new_password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPasswordForm({ old_password: "", new_password: "", confirm_password: "" });
      setStatus({ message: "🔒 Password changed successfully!", type: "success" });
      setTimeout(() => setStatus({ message: "", type: "" }), 2500);
    } catch {
      setStatus({ message: "❌ Error changing password.", type: "error" });
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      await API.delete(`bookings/my-bookings/${bookingId}/delete/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(bookings.filter((b) => b.id !== bookingId));
      setStatus({ message: "✅ Booking cancelled successfully!", type: "success" });
      setTimeout(() => setStatus({ message: "", type: "" }), 2500);
    } catch (err) {
      console.error(err);
      setStatus({ message: "❌ Failed to cancel booking.", type: "error" });
      setTimeout(() => setStatus({ message: "", type: "" }), 2500);
    }
  };

  if (!profile) return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
      <motion.div animate={{ opacity: [0.5, 1] }} transition={{ duration: 1, repeat: Infinity }}>
        <p className="text-gray-600 font-semibold text-lg">Loading profile...</p>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 pb-32 overflow-x-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 flex justify-center px-6 md:px-8">
        <div className="w-full max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 md:mb-0">
              Profile
            </h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 px-6 py-3 text-white hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg font-semibold"
            >
              <LogOut size={20} /> Logout
            </motion.button>
          </motion.div>

          {/* Status Message */}
          <AnimatePresence>
            {status.message && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`mb-8 rounded-xl px-6 py-4 font-semibold text-center ${
                  status.type === "success" ? "bg-green-100 border border-green-500 text-green-700" : "bg-red-100 border border-red-500 text-red-700"
                }`}
              >
                {status.message}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 p-10"
            >
              {/* Profile Header */}
              <div className="text-center mb-10 pb-8 border-b border-gray-200">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="relative w-40 h-40 mx-auto mb-6 group cursor-pointer"
                  onClick={() => document.getElementById('profile-image-input')?.click()}
                >
                  <img
                    key={profile.profile_image_url || "placeholder"}
                    src={preview || getFullImageUrl(profile.profile_image_url)}
                    alt="Profile"
                    onError={(e) => {
                      console.error("Image failed to load:", e.target.src);
                      e.target.src = "https://via.placeholder.com/150";
                    }}
                    onLoad={() => {
                      console.log("Image loaded successfully from:", preview || getFullImageUrl(profile.profile_image_url));
                    }}
                    className="w-40 h-40 rounded-full object-cover border-4 border-gradient-to-r from-purple-500 to-indigo-500 shadow-xl"
                  />
                  <div className="absolute inset-0 rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-semibold">Change Photo</span>
                  </div>
                  <input 
                    id="profile-image-input"
                    type="file" 
                    hidden 
                    accept="image/*" 
                    onChange={handleImageChange}
                  />
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{profile.username}</h2>
                <p className="text-gray-600 font-medium">{profile.email}</p>
              </div>

              {/* Edit Profile Form */}
              <form onSubmit={handleSubmit} className="space-y-6 mb-10">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <User size={24} className="text-purple-600" /> Edit Profile
                </h3>
                
                <div className="space-y-4">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="relative"
                  >
                    <input
                      type="text"
                      name="username"
                      value={form.username}
                      onChange={handleChange}
                      placeholder=" "
                      className="peer w-full bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-200 focus:border-purple-500 focus:bg-white rounded-xl py-3 px-4 text-gray-900 outline-none transition-all"
                    />
                    <label className="absolute left-4 -top-2.5 bg-white px-2 text-sm font-semibold text-purple-600 transition-all peer-focus:text-purple-600">
                      Username
                    </label>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                    className="relative"
                  >
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder=" "
                      className="peer w-full bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-200 focus:border-purple-500 focus:bg-white rounded-xl py-3 px-4 text-gray-900 outline-none transition-all"
                    />
                    <label className="absolute left-4 -top-2.5 bg-white px-2 text-sm font-semibold text-purple-600 transition-all peer-focus:text-purple-600">
                      Email
                    </label>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative"
                  >
                    <textarea
                      name="bio"
                      value={form.bio}
                      onChange={handleChange}
                      placeholder=" "
                      rows="4"
                      className="peer w-full bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-200 focus:border-purple-500 focus:bg-white rounded-xl py-3 px-4 text-gray-900 outline-none transition-all resize-none"
                    />
                    <label className="absolute left-4 -top-2.5 bg-white px-2 text-sm font-semibold text-purple-600 transition-all peer-focus:text-purple-600">
                      Bio
                    </label>
                  </motion.div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl text-white bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 disabled:opacity-50 font-bold transition-all duration-300 shadow-lg"
                >
                  {loading ? "Saving..." : "💾 Save Changes"}
                </motion.button>
              </form>

              {/* Change Password */}
              <div className="pt-8 border-t border-gray-200">
                <form onSubmit={handlePasswordSubmit} className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Lock size={24} className="text-purple-600" /> Change Password
                  </h3>
                  
                  <div className="space-y-4">
                    {[
                      { field: "old_password", label: "Current Password", icon: "🔐" },
                      { field: "new_password", label: "New Password", icon: "🔑" },
                      { field: "confirm_password", label: "Confirm Password", icon: "✓" },
                    ].map((item, i) => (
                      <motion.div 
                        key={item.field}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.05 }}
                        className="relative"
                      >
                        <input
                          type="password"
                          name={item.field}
                          value={passwordForm[item.field]}
                          onChange={handlePasswordChange}
                          placeholder=" "
                          className="peer w-full bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-200 focus:border-purple-500 focus:bg-white rounded-xl py-3 px-4 text-gray-900 outline-none transition-all"
                        />
                        <label className="absolute left-4 -top-2.5 bg-white px-2 text-sm font-semibold text-purple-600 transition-all peer-focus:text-purple-600">
                          {item.label}
                        </label>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-4 rounded-xl text-white bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 font-bold transition-all duration-300 shadow-lg"
                  >
                    🔒 Change Password
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Bookings Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-1 bg-white rounded-2xl shadow-lg border border-gray-100 p-10 h-fit"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <BookOpen size={28} className="text-purple-600" /> My Bookings
              </h2>
              
              {bookings.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <Calendar size={48} className="mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-500 font-medium">No booked classes yet.</p>
                  <p className="text-gray-400 text-sm mt-2">Book a class to get started!</p>
                </motion.div>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                  {bookings.map((booking, idx) => (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ x: 4, boxShadow: "0 8px 16px rgba(0, 0, 0, 0.08)" }}
                      className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 border border-purple-100 group"
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 text-sm group-hover:text-purple-600 transition">{booking.slot}</h3>
                          <p className="text-gray-500 text-xs mt-1 flex items-center gap-1">
                            <Calendar size={12} />
                            {new Date(booking.date_created).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className={`text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1 ${booking.status === "Confirmed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                            <CheckCircle2 size={14} /> {booking.status}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDeleteBooking(booking.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-lg transition-all"
                            title="Cancel booking"
                          >
                            <Trash2 size={16} />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
