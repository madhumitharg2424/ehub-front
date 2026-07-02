import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiCalendar,
  FiUsers,
  FiShield,
  FiArrowRight,
} from "react-icons/fi";

function Home() {
  return (
    <div className="min-h-screen bg-slate-100">

      {/* Hero Section */}

      <section className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 text-white">

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-24">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >

            <h1 className="text-6xl font-bold mb-6">
              eHub Event Management
            </h1>

            <p className="text-xl text-blue-100 max-w-2xl mb-8">
              Discover, manage and participate in events
              through a secure and modern event
              management platform.
            </p>

            <div className="flex gap-4">

              <Link
                to="/login"
                className="bg-white text-blue-700 px-4 md:px-6 py-3 rounded-xl font-semibold"
              >
                Get Started
              </Link>

              <Link
                to="/events"
                className="border border-white px-4 md:px-6 py-3 rounded-xl"
              >
                Browse Events
              </Link>

            </div>

          </motion.div>

        </div>

      </section>

      {/* Features */}

      <section className="max-w-7xl mx-auto px-4 md:px-6 py-20">

        <h2 className="text-2xl md:text-4xl font-bold text-center mb-12">
          Why Choose eHub
        </h2>

        <div className="grid md:grid-cols-3 gap-4 md:p-8">

          <div className="bg-white p-4 md:p-8 rounded-3xl shadow-xl">
            <FiCalendar
              size={40}
              className="text-blue-600 mb-4"
            />

            <h3 className="text-2xl font-bold mb-3">
              Event Discovery
            </h3>

            <p className="text-gray-600">
              Explore upcoming events with complete
              details and schedules.
            </p>
          </div>

          <div className="bg-white p-4 md:p-8 rounded-3xl shadow-xl">
            <FiUsers
              size={40}
              className="text-blue-600 mb-4"
            />

            <h3 className="text-2xl font-bold mb-3">
              Easy Registration
            </h3>

            <p className="text-gray-600">
              Register instantly and manage all
              registrations in one place.
            </p>
          </div>

          <div className="bg-white p-4 md:p-8 rounded-3xl shadow-xl">
            <FiShield
              size={40}
              className="text-blue-600 mb-4"
            />

            <h3 className="text-2xl font-bold mb-3">
              Secure Access
            </h3>

            <p className="text-gray-600">
              JWT-based authentication and role-based
              authorization.
            </p>
          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="bg-white">

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-20 text-center">

          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Start Exploring Events
          </h2>

          <p className="text-gray-600 mb-8">
            Join the platform and participate in
            exciting events.
          </p>

          <Link
            to="/login"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold"
          >
            Login
            <FiArrowRight />
          </Link>

        </div>

      </section>

    </div>
  );
}

export default Home;