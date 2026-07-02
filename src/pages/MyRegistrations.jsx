import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiCalendar,
  FiMapPin,
  FiUsers,
  FiCheckCircle,
  FiUser,
  FiMail,
} from "react-icons/fi";

import Navbar from "../components/Navbar";
import {
  getRegistrations,
  getMyRegistrations,
} from "../services/registrationService";

function MyRegistrations() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      let data;

      if (role === "USER") {
        data = await getMyRegistrations();
      } else {
        data = await getRegistrations();
      }

      setRegistrations(data);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex justify-center items-center text-xl font-semibold">
          Loading Registrations...
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 px-4 md:px-6 py-10">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-2xl md:text-4xl font-bold text-slate-800 mb-2">
            {role === "USER"
              ? "My Registrations"
              : "Event Registrations"}
          </h1>

          <p className="text-gray-600 mb-10">
            {role === "USER"
              ? "View all events you have successfully registered for."
              : "View all event registrations and participant details."}
          </p>

          {registrations.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
              <h2 className="text-2xl font-bold text-slate-700 mb-3">
                No Registrations Found
              </h2>

              <p className="text-gray-500">
                {role === "USER"
                  ? "You have not registered for any events yet."
                  : "No users have registered for any events yet."}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4 md:p-8">

              {registrations.map((registration, index) => (

                <motion.div
                  key={registration.id}
                  initial={{
                    opacity: 0,
                    y: 40,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.05,
                  }}
                  className="bg-white rounded-3xl shadow-xl p-6 hover:shadow-2xl transition"
                >

                  <div className="flex justify-between items-center mb-4">

                    <h2 className="text-2xl font-bold text-slate-800">
                      {registration.event?.title}
                    </h2>

                    <FiCheckCircle
                      size={28}
                      className="text-green-500"
                    />

                  </div>

                  <p className="text-gray-600 mb-6">
                    {registration.event?.description}
                  </p>

                  <div className="space-y-4">

                    <div className="flex items-center gap-3">
                      <FiMapPin className="text-blue-600" />
                      <span>
                        {registration.event?.venue}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <FiCalendar className="text-blue-600" />
                      <span>
                        {registration.event?.date}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <FiUsers className="text-blue-600" />
                      <span>
                        Capacity: {registration.event?.capacity}
                      </span>
                    </div>

                  </div>

                  {role !== "USER" && (
                    <div className="border-t mt-6 pt-6">

                      <h3 className="font-bold text-slate-800 mb-4">
                        Participant Details
                      </h3>

                      <div className="space-y-3">

                        <div className="flex items-center gap-3">
                          <FiUser className="text-indigo-600" />
                          <span>
                            {registration.user?.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <FiMail className="text-indigo-600" />
                          <span>
                            {registration.user?.email}
                          </span>
                        </div>

                        <div>
                          <span className="font-medium text-gray-700">
                            Registered On:
                          </span>

                          <br />

                          <span className="text-gray-500">
                            {registration.registrationDate
                              ? new Date(
                                  registration.registrationDate
                                ).toLocaleString()
                              : "N/A"}
                          </span>
                        </div>

                      </div>

                    </div>
                  )}

                  <div className="mt-6 pt-4 border-t">

                    <p className="text-green-600 font-semibold">
                      Registration Confirmed
                    </p>

                  </div>

                </motion.div>

              ))}

            </div>
          )}

        </div>

      </div>
    </>
  );
}

export default MyRegistrations;