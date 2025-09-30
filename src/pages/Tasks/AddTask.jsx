import React, { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState(new Date());
  const [budget, setBudget] = useState("");
  const [imageLink, setImageLink] = useState("");

  const { user } = useContext(AuthContext);
  const { email: userEmail, displayName } = user || {};

  const handleSubmit = (e) => {
    e.preventDefault();

    const taskData = {
      title,
      category,
      description,
      deadline,
      budget,
      imageLink,
      userEmail,
      displayName,
    };

    fetch("http://localhost:3000/add-task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Task added successfully:", data);
        resetForm();
      })
      .catch((err) => console.error("Error adding task:", err));
  };

  const resetForm = () => {
    setTitle("");
    setCategory("");
    setDescription("");
    setDeadline(new Date());
    setBudget("");
    setImageLink("");
  };

  return (
    <div className="max-w-3xl mx-auto p-10 bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-2xl border border-gray-100">
      <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-900">
        Post a New Job Task
      </h2>
      <p className="text-center text-gray-500 mb-8">
        Fill out the details below to create a task and start receiving bids from freelancers.
      </p>
      <hr className="mb-6" />

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Task Title & Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700">
              Task Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Build a Tailwind CSS landing page"
              required
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-semibold text-gray-700">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value="">Select a category</option>
              <option value="Web Development">Web Development</option>
              <option value="Design">Design</option>
              <option value="Writing">Writing</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide a detailed description of the task, requirements, and deliverables."
            required
            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            rows={5}
          />
        </div>

        {/* Budget, Deadline, Image Link */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="budget" className="block text-sm font-semibold text-gray-700">
              Budget ($)
            </label>
            <input
              type="number"
              id="budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="Min $1"
              required
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
          <div>
            <label htmlFor="deadline" className="block text-sm font-semibold text-gray-700">
              Deadline
            </label>
            <DatePicker
              selected={deadline}
              onChange={(date) => setDeadline(date)}
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
          <div>
            <label htmlFor="imageLink" className="block text-sm font-semibold text-gray-700">
              Image Link
            </label>
            <input
              type="url"
              id="imageLink"
              value={imageLink}
              onChange={(e) => setImageLink(e.target.value)}
              placeholder="Link to project visual (e.g., https://...)"
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            {/* ✅ Image Preview */}
            {imageLink && (
              <div className="mt-3">
                <img
                  src={imageLink}
                  alt="Preview"
                  className="w-full h-32 object-cover rounded-lg border border-gray-200 shadow-sm"
                />
              </div>
            )}
          </div>
        </div>

        {/* Poster Info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Poster Information (Read-Only)
          </h3>
          <hr className="mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="userName" className="block text-sm font-semibold text-gray-700">
                User Name
              </label>
              <input
                type="text"
                id="userName"
                value={displayName || ""}
                readOnly
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-100 text-gray-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label htmlFor="userEmail" className="block text-sm font-semibold text-gray-700">
                User Email
              </label>
              <input
                type="text"
                id="userEmail"
                value={userEmail || ""}
                readOnly
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-100 text-gray-500 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-[#00A63E] text-white font-bold py-3 rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.01] transition"
          >
            🚀 Post Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
