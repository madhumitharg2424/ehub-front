import { BrowserRouter, Routes, Route ,Navigate} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import MyRegistrations from "./pages/MyRegistrations";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/register"
          element={<Register />}
        />
        
          <Route
  path="/create-event"
  element={
    localStorage.getItem("role") === "ADMIN" ||
    localStorage.getItem("role") === "ORGANIZER"
      ? <CreateEvent />
      : <Navigate to="/events" />
  }
/>

<Route
  path="/edit-event/:id"
  element={
    localStorage.getItem("role") === "ADMIN" ||
    localStorage.getItem("role") === "ORGANIZER"
      ? <EditEvent />
      : <Navigate to="/events" />
  }
/>
        <Route
          path="/events"
          element={<Events />}
        />
       
        <Route
          path="/events/:id"
          element={<EventDetails />}
        />

        <Route
          path="/registrations"
          element={<MyRegistrations />}
        />
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;