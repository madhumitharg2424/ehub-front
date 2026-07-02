import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiCalendar,
  FiUsers,
  FiClipboard,
  FiActivity,
} from "react-icons/fi";

import Navbar from "../components/Navbar";
import DashboardChart from "../components/DashboardChart";

import { getDashboardStats } from "../services/dashboardService";
import { useNavigate } from "react-router-dom";
import DashboardBarChart
from "../components/DashboardBarChart";

function Dashboard() {
  const [stats, setStats] = useState(null);

  const navigate = useNavigate();

  const role =
    localStorage.getItem("role");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {

      const data =
        await getDashboardStats();

      setStats(data);

    } catch (error) {

      console.error(error);

    }
  };

  if (!stats) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen flex justify-center items-center text-xl font-semibold">
          Loading Dashboard...
        </div>
      </>
    );
  }

  const dashboardCards = [
    {
      title: "Total Events",
      value: stats.totalEvents,
      icon: <FiCalendar size={28} />,
    },
    {
      title: "Registrations",
      value: stats.totalRegistrations,
      icon: <FiClipboard size={28} />,
    },
    {
      title: "Users",
      value: stats.totalUsers,
      icon: <FiUsers size={28} />,
    },
    {
      title: "Status",
      value: "Active",
      icon: <FiActivity size={28} />,
    },
  ];

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 p-6">

        <div className="max-w-7xl mx-auto">

          {/* Header */}

          <div className="mb-10">

            <h1 className="text-2xl md:text-4xl font-bold text-slate-800">
              {role} Dashboard
            </h1>

            <p className="text-gray-600 mt-2">
              Welcome to eHub Event Management System
            </p>

          </div>

          {/* Stats Cards */}

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

            {dashboardCards.map((item, index) => (

              <motion.div
                key={item.title}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.1,
                }}
                className="bg-white rounded-3xl shadow-xl p-6"
              >

                <div className="flex justify-between items-center">

                  <div>

                    <p className="text-gray-500 mb-2">
                      {item.title}
                    </p>

                    <h2 className="text-3xl font-bold text-slate-800">
                      {item.value}
                    </h2>

                  </div>

                  <div className="bg-blue-100 text-blue-600 p-4 rounded-2xl">
                    {item.icon}
                  </div>

                </div>

              </motion.div>

            ))}

          </div>

          {/* Chart + Quick Actions */}

          <div className="grid lg:grid-cols-2 gap-4 md:p-8">

            <DashboardChart
              totalEvents={stats.totalEvents}
              totalRegistrations={stats.totalRegistrations}
              totalUsers={stats.totalUsers}
            />
            <DashboardBarChart
  totalEvents={stats.totalEvents}
  totalRegistrations={stats.totalRegistrations}
  totalUsers={stats.totalUsers}
/>
            <div className="bg-white rounded-3xl shadow-xl p-4 md:p-8">

              <h2 className="text-2xl font-bold mb-6">
                Quick Actions
              </h2>

              <div className="grid gap-4">

                <button
                  onClick={() =>
                    navigate("/events")
                  }
                  className="bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
                >
                  View Events
                </button>

                {(role === "ADMIN" ||
                  role === "ORGANIZER") && (

                  <button
                    onClick={() =>
                      navigate("/create-event")
                    }
                    className="bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition"
                  >
                    Create Event
                  </button>

                )}

                <button
                  onClick={() =>
                    navigate("/")
                  }
                  className="bg-slate-700 text-white py-3 rounded-xl hover:bg-slate-800 transition"
                >
                  Home
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default Dashboard;