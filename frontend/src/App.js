const API = "http://localhost:5000/api";

import React from "react";
import ResourceList from "./components/ResourceList";
import BookingForm from "./components/BookingForm";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Smart Resource Allocation System 🚀</h1>
      <BookingForm />
      <ResourceList />
    </div>
  );
}

export default App;