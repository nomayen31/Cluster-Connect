import React, { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider"; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddTask = () => {
  // State for form inputs
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState(new Date());  // Set initial state to current date
  const [budget, setBudget] = useState("");

  // Get user data from AuthContext
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
      userEmail,
      displayName, 
    };

    // Send POST request to the server
    fetch("http://localhost:3000/add-task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Task added successfully:", data);
        resetForm(); 
      })
      .catch((error) => {
        console.error("Error adding task:", error);
      });
  };

  // Function to reset the form
  const resetForm = () => {
    setTitle("");
    setCategory("");
    setDescription("");
    setDeadline(new Date()); // Reset to current date
    setBudget("");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6">Add New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Task Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Task Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category:
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a category</option>
            <option value="Web Development">Web Development</option>
            <option value="Design">Design</option>
            <option value="Writing">Writing</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Deadline Date Picker */}
        <div>
          <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
            Deadline:
          </label>
          <DatePicker
            selected={deadline}
            onChange={(date) => setDeadline(date)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Budget */}
        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
            Budget:
          </label>
          <input
            type="number"
            id="budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* User Email (Read-Only) */}
        <div>
          <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700">
            User Email:
          </label>
          <input
            type="text"
            id="userEmail"
            value={userEmail || ""}
            readOnly
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
          />
        </div>

        {/* User Name (Read-Only) */}
        <div>
          <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
            User Name:
          </label>
          <input
            type="text"
            id="userName"
            value={displayName || ""}
            readOnly
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
          />
        </div>

        {/* Add Button */}
        <div className="mt-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
