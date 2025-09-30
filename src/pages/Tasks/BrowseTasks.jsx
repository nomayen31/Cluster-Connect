import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

const BrowseTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:3000/browse-tasks');
        const data = await response.json();
        console.log(data);  // Log the data to confirm it's fetched correctly

        setTasks(data);  // Set tasks to the state
        setLoading(false); // Stop loading once data is fetched
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="container mx-auto p-6">
      {loading ? (
        <div className="text-center text-xl text-gray-500">Loading...</div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full text-sm text-gray-600">
            <thead className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
              <tr>
                <th className="py-3 px-6 text-left">Title</th>
                <th className="py-3 px-6 text-left">Category</th>
                <th className="py-3 px-6 text-left">Assigned User</th>
                <th className="py-3 px-6 text-left">Image</th>
                <th className="py-3 px-6 text-left">Details</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr
                  key={task._id}
                  className={`border-t ${index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'} hover:bg-gray-200`}
                >
                  <td className="py-4 px-6">{task.title}</td>
                  <td className="py-4 px-6">{task.category}</td>
                  <td className="py-4 px-6">{task.displayName}</td>
                  <td className="py-4 px-6">
                    <img
                      src={task.imageLink}
                      alt="Task image"
                      className="w-16 h-16 object-cover rounded-full border-2 border-gray-300"
                    />
                  </td>
                  <td className="py-4 px-6">
                    <Link
                      to={`/browse-tasks/${task._id}`} // ✅ Fixed
                      className="text-blue-500 hover:text-blue-700"
                    >
                      See Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BrowseTasks;
