import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiCalendar,
  FiMapPin,
  FiUsers,
  FiTag,
} from "react-icons/fi";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import { registerEvent } from "../services/registrationService";
import { getUserByEmail } from "../services/userService";
import {
  getEventById,
  getRegisteredCount,
} from "../services/eventService";

function EventDetails() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registeredCount, setRegisteredCount] =
    useState(0);

  const role =
    localStorage.getItem("role");

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    try {

      const eventData =
        await getEventById(id);

      const count =
        await getRegisteredCount(id);

      setEvent(eventData);
      setRegisteredCount(count);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    try {

      const email =
        localStorage.getItem("email");

      const user =
        await getUserByEmail(email);

      await registerEvent({
        userId: user.id,
        eventId: Number(id),
      });

      toast.success(
        "Registration Successful"
      );

      fetchEvent();

    } catch (error) {

      console.error(error);

      if (
        error.response?.data?.message
      ) {
        toast.error(
          error.response.data.message
        );
      } else {
        toast.error(
          "Registration Failed"
        );
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl font-semibold">
        Loading Event...
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500 text-xl">
        Event Not Found
      </div>
    );
  }

  const seatsLeft =
    Math.max(
      0,
      event.capacity - registeredCount
    );

  const isFull =
    registeredCount >= event.capacity;

  const eventDateTime =
    new Date(
      `${event.date}T${event.time}`
    );

  const isExpired =
    eventDateTime < new Date();

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 py-10 px-4">

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden"
        >

          <img
            src={
              event.imageUrl ||
              "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80"
            }
            alt={event.title}
            className="w-full h-80 object-cover"
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80";
            }}
          />

          <div className="p-5 md:p-10">

            <h1 className="text-3xl md:text-5xl font-bold text-slate-800 mb-4">
              {event.title}
            </h1>

            <div className="mb-5">

              {isExpired ? (

                <span className="bg-red-100 text-red-600 px-4 py-2 rounded-xl font-semibold">
                  Expired
                </span>

              ) : (

                <span className="bg-green-100 text-green-600 px-4 py-2 rounded-xl font-semibold">
                  Upcoming
                </span>

              )}

            </div>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {event.description}
            </p>

            <div className="grid md:grid-cols-2 gap-6">

              <div className="bg-slate-50 p-5 rounded-2xl">

                <div className="flex items-center gap-3 mb-3">
                  <FiMapPin className="text-blue-600" />
                  <span className="font-semibold">
                    Venue
                  </span>
                </div>

                <p>{event.venue}</p>

              </div>

              <div className="bg-slate-50 p-5 rounded-2xl">

                <div className="flex items-center gap-3 mb-3">
                  <FiCalendar className="text-blue-600" />
                  <span className="font-semibold">
                    Date & Time
                  </span>
                </div>

                <p>
                  {event.date}
                </p>

                <p>
                  {event.time}
                </p>

              </div>

              <div className="bg-slate-50 p-5 rounded-2xl">

                <div className="flex items-center gap-3 mb-3">
                  <FiUsers className="text-blue-600" />
                  <span className="font-semibold">
                    Capacity
                  </span>
                </div>

                <p className="text-lg font-semibold">
                  {event.capacity}
                </p>

                <p
                  className={`font-semibold mt-2 ${
                    isFull
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  Seats Left:
                  {" "}
                  {seatsLeft}
                  {" / "}
                  {event.capacity}
                </p>

              </div>

              <div className="bg-slate-50 p-5 rounded-2xl">

                <div className="flex items-center gap-3 mb-3">
                  <FiTag className="text-blue-600" />
                  <span className="font-semibold">
                    Category
                  </span>
                </div>

                <p>{event.category}</p>

              </div>

            </div>

            {role === "USER" && (

              <button
                onClick={handleRegister}
                disabled={
                  isFull || isExpired
                }
                className={`w-full mt-10 py-4 rounded-2xl text-lg font-semibold transition ${
                  isFull || isExpired
                    ? "bg-red-500 cursor-not-allowed text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {isExpired
                  ? "Registration Closed"
                  : isFull
                  ? "Event Full"
                  : "Register for Event"}
              </button>

            )}

          </div>

        </motion.div>

      </div>
    </>
  );
}

export default EventDetails;