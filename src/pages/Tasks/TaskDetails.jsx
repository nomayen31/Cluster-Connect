import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bidLoading, setBidLoading] = useState(false);

  // Function to fetch task details
  const fetchTaskDetails = async () => {
    setLoading(true);
    setError(null);

    try {
      const url = `http://localhost:3000/browse-tasks/${id}`;
      const response = await fetch(url);

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

  // Initial fetch on component mount or ID change
  useEffect(() => {
    if (id) {
      fetchTaskDetails();
    } else {
      setLoading(false);
      setError("No task ID provided in URL.");
    }
  }, [id]);

  // V3: Enhanced handleBid to isolate JSON parsing error
  const handleBid = async () => {
    setBidLoading(true);
    let response;
    
    try {
      // 1. Send POST request
      response = await fetch(`http://localhost:3000/tasks/${id}/bid`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      // 2. Check if the request itself failed (non-2xx status)
      if (!response.ok) {
        const errorText = await response.text();
        // Throw an error with the server's message
        throw new Error(`Server Error: ${response.status} - ${errorText || 'No body provided'}`);
      }

      // 3. Attempt to parse the JSON (This is the most likely failure point)
      let updatedTaskData;
      try {
        updatedTaskData = await response.json();
      } catch (jsonErr) {
        // This catch block handles JSON parsing failure specifically
        console.error("JSON Parsing Error after successful status:", jsonErr);
        // Throw a different error to distinguish it from a server-side error
        throw new Error("Failed to read server response (Invalid JSON format).");
      }
      
      // 4. Update the task state immediately with the new data from the server
      setTask(updatedTaskData); 

      // Show success toast
      toast.success("Bid placed successfully! 🎉");

    } catch (err) {
      // Log the specific error and show a generic failure toast
      console.error("Bid Placement Failed:", err.message);
      toast.error("Failed to place bid. Please try again later. Check console for details.");
    } finally {
      setBidLoading(false);
    }
  };

  if (loading) return <div className="text-center text-xl text-blue-500">Loading task details... ⏳</div>;
  if (error) return <div className="text-center text-xl text-red-600">Error: {error}</div>;
  if (!task) return <div className="text-center text-xl text-red-500">Task not found 😔</div>;

  return (
    <div className="container mx-auto p-6 bg-white shadow-xl rounded-lg mt-10">
      <div className="flex flex-col items-center">
        <img
          src={task.imageLink}
          alt={`Image for ${task.title}`}
          className="h-auto object-cover border-4 border-purple-500 mb-6 rounded-lg"
        />
        <h1 className="text-4xl font-extrabold mb-2 text-gray-800">{task.title}</h1>
        <div className="text-lg text-gray-600 space-y-3 w-full max-w-2xl mt-4">
          <p><strong>Category:</strong> <span className="font-medium text-purple-600">{task.category}</span></p>
          <p><strong>Assigned User:</strong> {task.displayName}</p>
          <p><strong>User Email:</strong> <a href={`mailto:${task.userEmail}`} className="text-blue-500 hover:underline">{task.userEmail}</a></p>
          <p><strong>Budget:</strong> <span className="text-green-600 font-semibold">${task.budget}</span></p>
          <p><strong>Deadline:</strong> {new Date(task.deadline).toLocaleDateString()}</p>

          {/* Bids Section */}
          <div className="mt-4">
            <p><strong>Bids:</strong> <span className="text-indigo-600 font-bold">{task.bids ?? 0}</span></p>
            <button
              onClick={handleBid}
              disabled={bidLoading}
              className="mt-2 px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 disabled:opacity-50"
            >
              {bidLoading ? "Placing Bid..." : "Place Bid"}
            </button>
          </div>

          <div className="border-t pt-3 mt-3">
            <h2 className="text-2xl font-semibold mb-2">Description:</h2>
            <p className="whitespace-pre-wrap leading-relaxed">{task.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;