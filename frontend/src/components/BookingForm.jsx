import { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:5000/api";

function BookingForm() {
  const [userName, setUserName] = useState("");
  const [resourceId, setResourceId] = useState("");
  const [priority, setPriority] = useState(1);
  const [resources, setResources] = useState([]);

  useEffect(() => {
    axios.get(`${API}/resources`).then((res) => setResources(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${API}/bookings`, {
      userName,
      resourceId,
      priority,
      timeSlot: "10AM-11AM",
    });
    alert(res.data.message);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-blue-600">
        Book Resource
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          type="text"
          placeholder="Enter your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />

        <select
          className="w-full p-3 border rounded-lg"
          onChange={(e) => setResourceId(e.target.value)}
          required
        >
          <option value="">Select Resource</option>
          {resources.map((r) => (
            <option key={r._id} value={r._id}>
              {r.name}
            </option>
          ))}
        </select>

        <select
          className="w-full p-3 border rounded-lg"
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="1">Low Priority</option>
          <option value="2">Medium Priority</option>
          <option value="3">High Priority</option>
          <option value="4">Emergency 🚨</option>
        </select>

        <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition">
          Book Now
        </button>

      </form>
    </div>
  );
}

export default BookingForm;