import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import {
  getEventById,
  updateEvent,
} from "../services/eventService";

function EditEvent() {

  const role = localStorage.getItem("role");

  if (
    role !== "ADMIN" &&
    role !== "ORGANIZER"
  ) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-2xl md:text-4xl font-bold text-red-600">
          Access Denied
        </h1>
      </div>
    );
  }

  const { id } = useParams();

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

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    try {

      const data =
        await getEventById(id);

      setEvent({
        title: data.title || "",
        description: data.description || "",
        venue: data.venue || "",
        date: data.date || "",
        time: data.time || "",
        capacity: data.capacity || "",
        category: data.category || "",
        imageUrl: data.imageUrl || "",
      });

    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {

    setEvent({
      ...event,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await updateEvent(
        id,
        event
      );

      toast.success(
        "Event Updated Successfully"
      );

      navigate("/events");

    } catch (error) {

      console.error(error);

      toast.error( "Failed To Update Event");

    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 p-4 md:p-8">

        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-4 md:p-8">

          <h1 className="text-2xl md:text-4xl font-bold mb-8 text-slate-800">
            Edit Event
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            <input
              type="text"
              name="title"
              value={event.title}
              onChange={handleChange}
              placeholder="Event Title"
              className="w-full border p-3 rounded-xl"
              required
            />

            <textarea
              name="description"
              value={event.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full border p-3 rounded-xl"
              required
            />

            <input
              type="text"
              name="venue"
              value={event.venue}
              onChange={handleChange}
              placeholder="Venue"
              className="w-full border p-3 rounded-xl"
              required
            />

            <input
              type="date"
              name="date"
              value={event.date}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
              required
            />

            <input
              type="time"
              name="time"
              value={event.time}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
              required
            />

            <input
              type="number"
              name="capacity"
              value={event.capacity}
              onChange={handleChange}
              placeholder="Capacity"
              className="w-full border p-3 rounded-xl"
              required
            />

            <input
              type="text"
              name="category"
              value={event.category}
              onChange={handleChange}
              placeholder="Category"
              className="w-full border p-3 rounded-xl"
              required
            />

            <input
              type="text"
              name="imageUrl"
              value={event.imageUrl}
              onChange={handleChange}
              placeholder="Image URL"
              className="w-full border p-3 rounded-xl"
            />

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700"
            >
              Update Event
            </button>

          </form>

        </div>

      </div>
    </>
  );
}

export default EditEvent;