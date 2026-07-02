import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiSearch,
  FiCalendar,
  FiMapPin,
  FiUsers,
} from "react-icons/fi";

import Navbar from "../components/Navbar";
import {
  getAllEvents,
  deleteEvent,
} from "../services/eventService";

import toast from "react-hot-toast";

function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const role = localStorage.getItem("role");
const loggedInEmail = localStorage.getItem("email");
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await getAllEvents();
      setEvents(data);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      event.category === category;

    return matchesSearch && matchesCategory;
  });

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmDelete) return;

    try {
      await deleteEvent(id);

      toast.success(
        "Event Deleted Successfully"
      );

      fetchEvents();
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to Delete Event"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100">

        {/* Hero Section */}

        <div className="bg-gradient-to-r from-blue-700 to-indigo-700 py-16">

          <div className="max-w-7xl mx-auto px-4 md:px-6">

            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Discover Events
            </h1>

            <p className="text-blue-100 text-lg">
              Explore and register for upcoming events.
            </p>

          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">

          {/* Search Bar */}

          <div className="bg-white rounded-2xl shadow-lg p-4 flex items-center gap-3 mb-6">

            <FiSearch
              size={22}
              className="text-gray-500"
            />

            <input
              type="text"
              placeholder="Search events..."
              className="w-full outline-none text-lg"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          {/* Category Filter */}

          <div className="flex flex-wrap gap-3 mb-8">

            {[
              "All",
              "Workshop",
              "Hackathon",
              "Technical",
              "Symposium",
              "Cultural",
              "Sports",
            ].map((cat) => (

              <button
                key={cat}
                onClick={() =>
                  setCategory(cat)
                }
                className={`px-4 py-2 rounded-xl font-medium transition ${
                  category === cat
                    ? "bg-blue-600 text-white"
                    : "bg-white text-slate-700 border hover:bg-slate-100"
                }`}
              >
                {cat}
              </button>

            ))}

          </div>

          {/* Event Cards */}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {filteredEvents.map((event, index) => (

              <motion.div
                key={event.id}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.1,
                }}
                className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition"
              >

                {/* Event Image */}

                <div className="relative">

                  <img
                    src={
                      event.imageUrl ||
                      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80"
                    }
                    alt={event.title}
                    className="w-full h-52 object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80";
                    }}
                  />

                  <div className="absolute inset-0 bg-black/20" />

                </div>

                <div className="p-6">

  {new Date(`${event.date}T${event.time}`) < new Date() ? (

    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-lg text-sm font-semibold">
      Expired
    </span>

  ) : (

    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-lg text-sm font-semibold">
      Upcoming
    </span>

  )}

  <h2 className="text-2xl font-bold mt-3 mb-3">
    {event.title}
  </h2>

                  <p className="text-gray-600 mb-5 line-clamp-3">
                    {event.description}
                  </p>

                  <div className="space-y-3 text-gray-700">

                    <div className="flex items-center gap-2">
                      <FiMapPin />
                      {event.venue}
                    </div>

                    <div className="flex items-center gap-2">
                      <FiCalendar />
                      {event.date}
                    </div>

                    <div className="flex items-center gap-2">
                      <FiUsers />
                      Capacity: {event.capacity}
                    </div>

                  </div>

                  <div className="mt-6 space-y-3">

                    <Link
                      to={`/events/${event.id}`}
                      className="block text-center bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
                    >
                      View Details
                    </Link>

                    {(
  role === "ADMIN" ||
  (
    role === "ORGANIZER" &&
    event.organizer?.email === loggedInEmail
  )
) && (
  <>
    <Link
      to={`/edit-event/${event.id}`}
      className="block text-center bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition"
    >
      Edit Event
    </Link>

    <button
      onClick={() =>
        handleDelete(event.id)
      }
      className="w-full bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition"
    >
      Delete Event
    </button>
  </>
)}

                  </div>

                </div>

              </motion.div>

            ))}

          </div>

        </div>

      </div>
    </>
  );
}

export default Events;