import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";

const FeaturedTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("https://cluster-connect-server.vercel.app/featured-tasks");
        if (!response.ok) throw new Error("Failed to fetch tasks");
        const data = await response.json();
        setTasks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  if (loading)
    return (
      <div className="text-center text-xl text-blue-500 mt-10">
        Loading Featured Tasks...
      </div>
    );
  if (error)
    return (
      <div className="text-center text-xl text-red-500 mt-10">
        Error: {error}
      </div>
    );

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-4xl font-extrabold text-gray-900 mb-2 text-left">
          Featured Jobs
        </h2>
        <p className="text-left text-gray-500 mb-12">
          Recruitment Made Easy in 100 seconds
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {tasks.map((task, idx) => (
            <div
              key={task._id}
              className={`rounded-xl p-6 shadow-lg transform transition duration-300 hover:scale-[1.02] hover:shadow-2xl ${
                idx % 2 === 0
                  ? "bg-gradient-to-r from-blue-50 to-indigo-100"
                  : "bg-gradient-to-r from-green-50 to-emerald-100"
              }`}
            >
              {/* Header: Logo + Info */}
              <div className="flex items-center gap-4">
                <img
                  src={task.imageLink || "https://via.placeholder.com/60"}
                  alt={task.title}
                  className="w-16 h-16 rounded-lg object-cover border border-gray-200 shadow-sm"
                />
                <div>
                  <p className="text-indigo-600 font-semibold">
                    {task.displayName || "Unknown"}
                  </p>
                  <h3 className="text-lg font-bold text-gray-900">
                    {task.title}
                  </h3>
                  <span className="inline-block mt-1 bg-white/70 text-gray-700 text-xs font-medium px-2 py-1 rounded-full shadow-sm">
                    {task.category}
                  </span>
                </div>
              </div>

              {/* Body: Deadline + Budget */}
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar size={16} />
                  {task.deadline
                    ? new Date(task.deadline).toLocaleDateString()
                    : "No deadline"}
                </div>
                <p className="text-green-700 font-bold text-lg">
                  ${task.budget}
                  <span className="text-sm text-gray-500"> / job</span>
                </p>
              </div>

              {/* Footer: CTA */}
              <div className="mt-6">
                <Link
                  to={`/browse-tasks/${task._id}`}
                  className="inline-block w-full text-center px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
                >
                  Bid Job
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedTasks;
