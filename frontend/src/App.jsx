import { useEffect, useState } from "react";
import axios from "axios";
import ResourceList from "./components/ResourceList";
import BookingForm from "./components/BookingForm";

const API = "http://localhost:5000/api";

function App() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
  fetchResources();

  const interval = setInterval(() => {
    fetchResources();
  }, 3000);

  return () => clearInterval(interval);
}, []);

  const fetchResources = async () => {
    const res = await axios.get(`${API}/resources`);
    setResources(res.data);
  };

  // 🔥 Calculate stats
  const total = resources.length;
  const available = resources.filter(r => r.status === "available").length;
  const booked = resources.filter(r => r.status === "booked").length;

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Smart Resource Allocation System 🚀
      </h1>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">

        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-gray-500">Total Resources</h2>
          <p className="text-2xl font-bold text-blue-500">{total}</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-gray-500">Available</h2>
          <p className="text-2xl font-bold text-green-500">{available}</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-gray-500">Booked</h2>
          <p className="text-2xl font-bold text-red-500">{booked}</p>
        </div>

      </div>

      {/* Main Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <BookingForm />
        <ResourceList />
      </div>

    </div>
  );
}

export default App;