import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BrowseTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:3000/browse-tasks");
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="container mx-auto p-6 min-h-screen">
      {loading ? (
        <div className="text-center text-2xl font-semibold text-indigo-600 mt-20">
          Loading tasks...
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-20 bg-white shadow-xl rounded-xl border border-gray-200">
          <p className="text-2xl text-gray-700 font-medium">
            No tasks available right now.
          </p>
          <p className="text-gray-400 mt-2">
            Check back later or post a new task.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl shadow-2xl bg-white">
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <tr>
                  <th className="py-4 px-6 text-left text-sm font-semibold tracking-wide rounded-tl-xl">
                    Title
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-semibold tracking-wide">
                    Category
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-semibold tracking-wide">
                    Posted By
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-semibold tracking-wide">
                    Image
                  </th>
                  <th className="py-4 px-6 text-center text-sm font-semibold tracking-wide rounded-tr-xl">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {tasks.map((task, index) => (
                  <tr
                    key={task._id}
                    className={`transition duration-200 hover:bg-indigo-50 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="py-4 px-6 font-medium text-gray-900">
                      {task.title}
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full">
                        {task.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-600">
                      {task.displayName || "Unknown"}
                    </td>
                    <td className="py-4 px-6">
                      <img
                        src={task.imageLink}
                        alt={task.title}
                        className="w-16 h-16 object-cover rounded-lg border border-gray-200 shadow-sm"
                      />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Link
                        to={`/browse-tasks/${task._id}`}
                        className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition transform hover:scale-105"
                      >
                        See Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tablet + Mobile Card View */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 lg:hidden">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col gap-3 hover:shadow-lg transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={task.imageLink}
                    alt={task.title}
                    className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {task.title}
                    </h3>
                    <span className="inline-block mt-1 bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full">
                      {task.category}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  Posted by:{" "}
                  <span className="font-medium">
                    {task.displayName || "Unknown"}
                  </span>
                </p>
                <Link
                  to={`/browse-tasks/${task._id}`}
                  className="w-full text-center px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                >
                  See Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BrowseTasks;
