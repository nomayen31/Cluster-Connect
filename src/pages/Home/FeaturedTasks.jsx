import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const FeaturedTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:3000/featured-tasks');
        if (!response.ok) throw new Error('Failed to fetch tasks');
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

  if (loading) return <div className="text-center text-xl text-blue-500 mt-10">Loading Featured Tasks...</div>;
  if (error) return <div className="text-center text-xl text-red-500 mt-10">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
        Featured Tasks
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {tasks.map(task => (
          <Link
            to={`/browse-tasks/${task._id}`}
            key={task._id}
            className="group block bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
          >
            <div className="relative w-full h-56">
              <img
                src={task.imageLink}
                alt={task.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 group-hover:text-purple-600 transition-colors duration-300">{task.title}</h3>
              <p className="text-gray-500 mt-2">{task.category}</p>
              <p className="mt-3 text-sm text-gray-600">
                Deadline: <span className="font-medium text-red-500">{new Date(task.deadline).toLocaleDateString()}</span>
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Assigned to: <span className="font-medium">{task.displayName}</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturedTasks;
