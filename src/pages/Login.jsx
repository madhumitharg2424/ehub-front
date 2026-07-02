import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";
import { motion } from "framer-motion";
import { loginUser } from "../services/authService";
import { getUserByEmail } from "../services/userService";
import toast from "react-hot-toast";
function Login() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await loginUser({
        email,
        password,
      });

      const user = await getUserByEmail(email);

localStorage.setItem(
  "token",
  response.token
);

localStorage.setItem(
  "email",
  email
);

localStorage.setItem(
  "role",
  user.role
);

navigate("/events");
    } catch (error) {
      console.error(error);
      toast.error("Invalid Email or Password");
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
            Event Management Platform
          </p>

          <form onSubmit={handleLogin}>

            <div className="mb-5">
              <label className="block text-white mb-2">
                Email
              </label>

              <div className="flex items-center bg-white rounded-xl px-4">
                <FiMail className="text-gray-500" />

                <input
                  type="email"
                  placeholder="Enter email"
                  className="w-full p-3 outline-none rounded-xl"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
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
                  placeholder="Enter password"
                  className="w-full p-3 outline-none rounded-xl"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                />
              </div>
            </div>

            <button
              disabled={loading}
              className="w-full bg-white text-blue-700 font-semibold py-3 rounded-xl hover:scale-[1.02] transition"
            >
              {loading
                ? "Signing In..."
                : "Login"}
            </button>

          </form>

          <p className="text-center text-blue-100 mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-bold text-white"
            >
              Register
            </Link>
          </p>

        </div>

      </motion.div>

    </div>
  );
}

export default Login;