import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // To access URL params

const TaskDetails = () => {
  const { id } = useParams();
  console.log("Task ID from URL:", id);

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = `http://localhost:3000/browse-tasks/${id}`; // ✅ Fixed
        console.log(`Fetching task from: ${url}`);

        const response = await fetch(url);

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage || `Failed to fetch task: ${response.status}`);
        }

        const data = await response.json();
        console.log('Task data:', data);
        setTask(data);
      } catch (err) {
        console.error('Error fetching task details:', err.message);
        setError(err.message);
        setTask(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTaskDetails();
    } else {
      setLoading(false);
      setError("No task ID provided in URL.");
    }
  }, [id]);

  if (loading) return <div className="text-center text-xl text-blue-500">Loading task details... ⏳</div>;
  if (error) return <div className="text-center text-xl text-red-600">Error: {error}</div>;
  if (!task) return <div className="text-center text-xl text-red-500">Task not found 😔</div>;

  return (
    <div className="container mx-auto p-6 bg-white shadow-xl rounded-lg mt-10">
      <div className="flex flex-col items-center">
        <img
          src={task.imageLink}
          alt={`Image for ${task.title}`}
          className=" h-auto object-cover border-4 border-purple-500 mb-6 rounded-lg"
        />

        <h1 className="text-4xl font-extrabold mb-2 text-gray-800">{task.title}</h1>
        <div className="text-lg text-gray-600 space-y-3 w-full max-w-2xl mt-4">
          <p><strong>Category:</strong> <span className="font-medium text-purple-600">{task.category}</span></p>
          <p><strong>Assigned User:</strong> {task.displayName}</p>
          <p><strong>User Email:</strong> <a href={`mailto:${task.userEmail}`} className="text-blue-500 hover:underline">{task.userEmail}</a></p>
          <p><strong>Budget:</strong> <span className="text-green-600 font-semibold">${task.budget}</span></p>
          <p><strong>Deadline:</strong> {new Date(task.deadline).toLocaleDateString()}</p>
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
