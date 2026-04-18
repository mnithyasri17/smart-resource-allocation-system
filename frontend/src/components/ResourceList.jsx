import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api";

function ResourceList() {
    const [resources, setResources] = useState([]);

    const getIcon = (type) => {
        if (type === "bed") return "🛏";
        if (type === "lab") return "🧪";
        if (type === "equipment") return "🛠";
        return "🏢";
    };

    useEffect(() => {
        axios.get(`${API}/resources`).then((res) => setResources(res.data));
    }, []);

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Resources</h2>

            <div className="grid gap-4">
                {resources.map((r) => (
                    <div
                        key={r._id}
                        className="bg-white p-5 rounded-2xl shadow hover:shadow-xl transition"
                    >
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-bold">
                                {getIcon(r.type)} {r.name}
                            </h3>

                            <span
                                className={`px-3 py-1 rounded-full text-sm font-semibold ${r.status === "available"
                                    ? "bg-green-100 text-green-600"
                                    : "bg-red-100 text-red-600"
                                    }`}
                            >
                                {r.status}
                            </span>
                        </div>

                        <p className="text-gray-500 text-sm mt-1">
                            Type: {r.type.toUpperCase()}
                        </p>

                        {r.currentBooking && (
                            <p className="mt-2 text-sm">
                                👤 <b>{r.currentBooking.userName}</b>
                            </p>
                        )}

                        {r.waitlist && r.waitlist.length > 0 && (
                            <div className="mt-3">
                                <p className="text-sm font-semibold text-yellow-600">
                                    ⏳ Waitlist:
                                </p>

                                <ul className="text-sm text-gray-600">
                                    {r.waitlist.map((w, index) => (
                                        <li key={index}>
                                            {index + 1}. {w.userName}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ResourceList;