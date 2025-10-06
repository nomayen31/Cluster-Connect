import React, { useState, useEffect, useContext } from "react";
import { useLoaderData, useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";

const UpdateTask = () => {
  const initialTaskData = useLoaderData();
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [task, setTask] = useState(initialTaskData || {});
  const categories = ["Web Development", "Digital Marketing", "Graphics Design"];

  useEffect(() => {
    if (initialTaskData) setTask(initialTaskData);
  }, [initialTaskData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedTask = {
      ...task,
      userName: user?.displayName || task.userName,
      userEmail: user?.email || task.userEmail,
      budget: parseFloat(task.budget),
      image: task.image,
    };

    try {
      const response = await fetch(`https://cluster-connect-server.vercel.app/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) throw new Error("Failed to update task");
      const result = await response.json();

      if (result.modifiedCount > 0) {
        Swal.fire("Updated!", "Your task has been successfully updated.", "success");
        navigate("/my-posted-task");
      } else {
        Swal.fire("No Changes", "The task was not updated.", "info");
      }
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  if (!task._id) {
    return (
      <div className="text-center text-2xl font-semibold text-red-600 mt-20">
        Task not found!
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 lg:p-10 min-h-screen">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-900">
        Update Task: {task.title}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-2xl border border-gray-200 space-y-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Posted By Name</label>
            <input
              type="text"
              value={user?.displayName || task.userName || ""}
              disabled
              className="mt-2 w-full rounded-md p-3 bg-gray-100 text-gray-700 border border-gray-300 shadow-sm cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Posted By Email</label>
            <input
              type="email"
              value={user?.email || task.userEmail || ""}
              disabled
              className="mt-2 w-full rounded-md p-3 bg-gray-100 text-gray-700 border border-gray-300 shadow-sm cursor-not-allowed"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Task Title</label>
            <input
              type="text"
              name="title"
              value={task.title || ""}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-md p-3 border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Category</label>
            <select
              name="category"
              value={task.category || ""}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-md p-3 border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 bg-white shadow-sm"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Deadline</label>
            <input
              type="date"
              name="deadline"
              value={task.deadline ? new Date(task.deadline).toISOString().substring(0, 10) : ""}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-md p-3 border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Budget ($)</label>
            <input
              type="number"
              name="budget"
              value={task.budget || ""}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="mt-2 w-full rounded-md p-3 border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Task Image (URL)</label>
          <input
            type="text"
            name="image"
            value={task.image || ""}
            onChange={handleChange}
            placeholder="Enter image URL"
            className="mt-2 w-full rounded-md p-3 border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm"
          />
          {task.image && (
            <div className="mt-4 flex flex-col items-start">
              <p className="text-sm text-gray-500 mb-2">Current Image Preview:</p>
              <img
                src={task.image}
                alt="Task Preview"
                className="w-40 h-40 object-cover rounded-lg border shadow-md"
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Description</label>
          <textarea
            name="description"
            rows="4"
            value={task.description || ""}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-md p-3 border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-6 rounded-lg text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all"
        >
          Update Task
        </button>
      </form>
    </div>
  );
};

export default UpdateTask;
