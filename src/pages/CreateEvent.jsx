import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../services/eventService";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

function CreateEvent() {
  const role = localStorage.getItem("role");

if (
  role !== "ADMIN" &&
  role !== "ORGANIZER"
) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-2xl md:text-4xl font-bold text-red-600">
        Access Denied
      </h1>
    </div>
  );
}
  const navigate = useNavigate();

  const [event, setEvent] = useState({
    title: "",
    description: "",
    venue: "",
    date: "",
    time: "",
    capacity: "",
    category: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await createEvent(event);

      toast.success("Event Created Successfully");

      navigate("/events");

    } catch (error) {

      console.error(error);

      toast.error("Failed to Create Event");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 p-4 md:p-8">

        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-4 md:p-8">

          <h1 className="text-2xl md:text-4xl font-bold mb-8 text-slate-800">
            Create Event
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            <input
              type="text"
              name="title"
              placeholder="Event Title"
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
              required
            />

            <textarea
              name="description"
              placeholder="Description"
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
              required
            />

            <input
              type="text"
              name="venue"
              placeholder="Venue"
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
              required
            />

            <input
              type="date"
              name="date"
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
              required
            />

            <input
              type="time"
              name="time"
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
              required
            />

            <input
              type="number"
              name="capacity"
              placeholder="Capacity"
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
              required
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
              required
            />

            <input
              type="text"
              name="imageUrl"
              placeholder="Image URL"
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
            >
              Create Event
            </button>

          </form>

        </div>

      </div>
    </>
  );
}

export default CreateEvent;