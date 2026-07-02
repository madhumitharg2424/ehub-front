import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { motion } from "framer-motion";
import { registerUser } from "../services/authService";
import toast from "react-hot-toast";
function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await registerUser(formData);

      toast.success("Registration Successful");

      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-slate-900 flex justify-center items-center px-4">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-4 md:p-8">

          <h1 className="text-3xl md:text-5xl font-bold text-center text-white mb-2">
            eHub
          </h1>

          <p className="text-center text-blue-100 mb-8">
            Create Your Account
          </p>

          <form onSubmit={handleRegister}>

            <div className="mb-5">
              <label className="block text-white mb-2">
                Name
              </label>

              <div className="flex items-center bg-white rounded-xl px-4">
                <FiUser className="text-gray-500" />

                <input
                  type="text"
                  name="name"
                  placeholder="Enter name"
                  className="w-full p-3 outline-none"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-white mb-2">
                Email
              </label>

              <div className="flex items-center bg-white rounded-xl px-4">
                <FiMail className="text-gray-500" />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  className="w-full p-3 outline-none"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-white mb-2">
                Password
              </label>

              <div className="flex items-center bg-white rounded-xl px-4">
                <FiLock className="text-gray-500" />

                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  className="w-full p-3 outline-none"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button
              disabled={loading}
              className="w-full bg-white text-blue-700 font-semibold py-3 rounded-xl hover:scale-[1.02] transition"
            >
              {loading
                ? "Creating Account..."
                : "Register"}
            </button>

          </form>

          <p className="text-center text-blue-100 mt-6">
            Already have an account?{" "}
            <Link
              to="/"
              className="font-bold text-white"
            >
              Login
            </Link>
          </p>

        </div>
      </motion.div>

    </div>
  );
}

export default Register;