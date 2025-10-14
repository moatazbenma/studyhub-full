import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../../api/api";
import { useNavigate } from "react-router-dom";
import { LogOut, Trash2 } from "lucide-react";

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };
  const handlePasswordChange = (e) => setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("username", form.username);
    formData.append("email", form.email);
    formData.append("bio", form.bio);
    if (image) formData.append("image", image);

    try {
      const res = await API.post("auth/profile/update/", formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });
      setProfile(res.data);
      setStatus({ message: "✅ Profile updated successfully!", type: "success" });
      setTimeout(() => setStatus({ message: "", type: "" }), 2500);
    } catch {
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

  if (!profile) return <div className="p-6 text-center text-gray-500">Loading profile...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 p-6">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent mb-4 md:mb-0">
          StudyHub
        </h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg bg-purple-500 px-5 py-2 text-white hover:bg-red-600 transition-colors duration-300"
        >
          <LogOut size={24} /> Logout
        </button>
      </header>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Profile & Password */}
        <div className="bg-white shadow-xl rounded-3xl p-8 relative overflow-hidden border border-gray-200">
          <AnimatePresence>
            {status.message && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`absolute top-0 left-0 right-0 text-center py-2 font-medium ${
                  status.type === "success" ? "bg-green-500" : "bg-red-500"
                } text-white rounded-b-lg`}
              >
                {status.message}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="text-center mb-8">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <img
                src={preview || profile.profile_image_url || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500 shadow-lg"
              />
              <label className="absolute bottom-0 right-0 bg-indigo-600 text-white px-3 py-1 rounded-full cursor-pointer hover:bg-indigo-700 text-sm font-medium">
                Change
                <input type="file" hidden accept="image/*" onChange={handleImageChange} />
              </label>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{profile.username}</h2>
            <p className="text-gray-500">{profile.email}</p>
          </div>

          {/* Modern Form Inputs */}
          <form onSubmit={handleSubmit} className="space-y-5 mb-6">
            <div className="relative">
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full border-b-2 border-gray-300 focus:border-indigo-500 outline-none py-2 text-gray-700"
              />
              <label className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base">
                Username
              </label>
            </div>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full border-b-2 border-gray-300 focus:border-indigo-500 outline-none py-2 text-gray-700"
              />
              <label className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base">
                Email
              </label>
            </div>
            <div className="relative">
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                placeholder=" "
                rows="3"
                className="peer w-full border-b-2 border-gray-300 focus:border-indigo-500 outline-none py-2 text-gray-700 resize-none"
              />
              <label className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base">
                Bio
              </label>
            </div>
            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full py-3 rounded-xl text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 font-semibold transition"
            >
              Save Changes
            </motion.button>
          </form>

          {/* Password */}
          <h3 className="text-xl font-semibold text-indigo-600 mb-4">Change Password</h3>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            {["old_password", "new_password", "confirm_password"].map((field, i) => (
              <div key={i} className="relative">
                <input
                  type="password"
                  name={field}
                  value={passwordForm[field]}
                  onChange={handlePasswordChange}
                  placeholder=" "
                  className="peer w-full border-b-2 border-gray-300 focus:border-indigo-500 outline-none py-2 text-gray-700"
                />
                <label className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base">
                  {field.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                </label>
              </div>
            ))}
            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full py-3 rounded-xl text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 font-semibold transition"
            >
              Change Password
            </motion.button>
          </form>
        </div>

        {/* Bookings */}
        <div className="bg-white shadow-xl rounded-3xl p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">My Bookings</h2>
          {bookings.length === 0 ? (
            <p className="text-gray-500">No booked classes yet.</p>
          ) : (
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex justify-between items-center p-4 border rounded-xl hover:shadow-lg transition bg-gray-50"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{booking.slot}</h3>
                    <p className="text-gray-500 text-sm">
                      Booked on: {new Date(booking.date_created).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`font-semibold ${booking.status === "Confirmed" ? "text-green-500" : "text-yellow-500"}`}>
                      {booking.status}
                    </span>
                    <button
                      onClick={() => handleDeleteBooking(booking.id)}
                      className="flex items-center gap-1 text-red-500 hover:text-red-600 font-semibold transition"
                    >
                      <Trash2 size={16} /> Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
