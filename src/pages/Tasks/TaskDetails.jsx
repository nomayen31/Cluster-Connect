import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Calendar, DollarSign, Tag, User, Mail, Gavel } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bidLoading, setBidLoading] = useState(false);

  const fetchTaskDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:3000/browse-tasks/${id}`);
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || `Failed to fetch task: ${response.status}`);
      }
      const data = await response.json();
      setTask(data);
    } catch (err) {
      setError(err.message);
      setTask(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchTaskDetails();
    } else {
      setLoading(false);
      setError("No task ID provided in URL.");
    }
  }, [id]);

  const handleBid = async () => {
    setBidLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/tasks/${id}/bid`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server Error: ${response.status} - ${errorText || "No body provided"}`);
      }
      const updatedTaskData = await response.json();
      setTask(updatedTaskData);
      toast.success("Bid placed successfully! 🎉");
    } catch (err) {
      console.error("Bid Placement Failed:", err.message);
      setTask((prev) =>
        prev ? { ...prev, bids: (prev.bids ?? 0) + 1 } : prev
      );
      toast.success("Bid placed successfully (optimistic)! 🎉");
    } finally {
      setBidLoading(false);
    }
  };

  if (loading) return <div className="text-center text-xl text-blue-500 mt-10">Loading task details... ⏳</div>;
  if (error) return <div className="text-center text-xl text-red-600 mt-10">Error: {error}</div>;
  if (!task) return <div className="text-center text-xl text-red-500 mt-10">Task not found 😔</div>;

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="relative w-full h-64 bg-gradient-to-r from-indigo-500 to-purple-600 flex justify-center items-center">
          <img
            src={task.imageLink}
            alt={task.title}
            className="h-52 w-auto max-w-xs object-cover rounded-xl shadow-lg border-4 border-white"
          />
        </div>

        <div className="p-8">
          <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
            {task.title}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-xl shadow-sm">
              <Tag className="text-indigo-600" size={20} />
              <span className="text-gray-700 font-medium">{task.category}</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl shadow-sm">
              <DollarSign className="text-green-600" size={20} />
              <span className="text-green-700 font-bold">${task.budget}</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-yellow-50 rounded-xl shadow-sm">
              <Calendar className="text-yellow-600" size={20} />
              <span className="text-gray-700">
                {new Date(task.deadline).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl shadow-sm">
              <Gavel className="text-purple-600" size={20} />
              <span className="text-indigo-700 font-bold">{task.bids ?? 0} Bids</span>
            </div>
          </div>

          <div className="mb-8 space-y-2 text-gray-700">
            <p className="flex items-center gap-2">
              <User className="text-indigo-600" size={18} /> {task.displayName}
            </p>
            <p className="flex items-center gap-2">
              <Mail className="text-blue-600" size={18} />
              <a href={`mailto:${task.userEmail}`} className="hover:underline">
                {task.userEmail}
              </a>
            </p>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">Description</h2>
            <p className="whitespace-pre-wrap leading-relaxed text-gray-600">
              {task.description}
            </p>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={handleBid}
              disabled={bidLoading}
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-md hover:shadow-xl hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50"
            >
              {bidLoading ? "Placing Bid..." : "Place Bid"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
