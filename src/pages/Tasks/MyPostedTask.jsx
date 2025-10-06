import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";

const MyPostedTask = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [taskBids, setTaskBids] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!user?.email) {
        setLoading(false);
        setError("User email not found.");
        return;
      }
      try {
        const response = await fetch(
          `https://cluster-connect-server.vercel.app/my-posted-task?userEmail=${user.email}`
        );
        if (!response.ok) throw new Error("Failed to fetch your tasks");
        const data = await response.json();
        setTasks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [user]);

 const handleDelete = async (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "Do you really want to delete this task?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#6c757d", // gray for cancel
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await fetch(`https://cluster-connect-server.vercel.app/tasks/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (!response.ok) throw new Error("Failed to delete task");

        setTasks((prev) => prev.filter((task) => task._id !== id));

        Swal.fire("Deleted!", "Your task has been deleted.", "success");
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      }
    }
  });
};

  const handleViewBids = async (taskId) => {
    try {
      const response = await fetch(`https://cluster-connect-server.vercel.app/tasks/${taskId}/bids`);
      if (!response.ok) throw new Error("Failed to fetch bids");
      const data = await response.json();
      setTaskBids(data.bids);
      setModalOpen(true);
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setTaskBids(null);
  };

  if (loading)
    return (
      <div className="text-center text-2xl font-semibold text-indigo-600 mt-20 animate-pulse">
        Loading your tasks...
      </div>
    );
  if (error)
    return (
      <div className="text-center text-2xl font-semibold text-red-600 mt-20">
        Error: {error}
      </div>
    );

  return (
    <div className="container mx-auto p-6 lg:p-10 min-h-screen">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-900">
        Your Posted Tasks
      </h2>

      {tasks.length === 0 ? (
        <div className="text-center py-20 bg-white/80 backdrop-blur-lg shadow-lg rounded-2xl border border-gray-200">
          <p className="text-2xl text-gray-800 font-semibold">
            You haven't posted any tasks yet.
          </p>
          <p className="text-gray-500 mt-2">
            Start your journey by creating your first task.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl shadow-2xl bg-white/90 backdrop-blur-lg border border-gray-100">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <tr>
                <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wide rounded-tl-2xl">
                  Task
                </th>
                <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wide">
                  Category
                </th>
                <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wide">
                  Deadline
                </th>
                <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wide">
                  Budget
                </th>
                <th className="py-4 px-6 text-center text-sm font-semibold uppercase tracking-wide rounded-tr-2xl">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tasks.map((task, index) => (
                <tr
                  key={task._id}
                  className={`transition duration-200 hover:bg-indigo-50 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50/60"
                  }`}
                >
                  <td className="py-4 px-6 flex items-center gap-4">
                    <img
                      src={task.imageLink || "https://via.placeholder.com/50"}
                      alt={task.title}
                      className="w-12 h-12 rounded-lg object-cover shadow-sm"
                    />
                    <span className="font-semibold text-gray-900 truncate max-w-xs">
                      {task.title}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                      {task.category}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-600">
                    {new Date(task.deadline).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 text-green-600 font-bold">
                    ${task.budget}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex flex-wrap justify-center gap-2">
                      <Link
                        to={`/update-task/${task._id}`}
                        className="px-4 py-2 text-sm font-medium bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition transform hover:scale-105"
                      >
                        Update
                      </Link>
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition transform hover:scale-105"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleViewBids(task._id)}
                        className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition transform hover:scale-105"
                      >
                        View Bids
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate-fadeIn">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-96 text-center">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Total Bids</h3>
            <p className="text-5xl font-extrabold text-indigo-600 mb-6">
              {taskBids !== null ? taskBids : "Loading..."}
            </p>
            <button
              onClick={closeModal}
              className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPostedTask;
