import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider'; // your auth provider

const MyPostedTask = () => {
  const { user } = useContext(AuthContext); // get logged-in user
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tasks posted by the current user
  useEffect(() => {
    const fetchTasks = async () => {
      if (!user?.email) {
        setLoading(false);
        setError("User email not found.");
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/my-posted-task?userEmail=${user.email}`);
        if (!response.ok) throw new Error('Failed to fetch your tasks');
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

  // Delete task
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) throw new Error('Failed to delete task');
      setTasks(prev => prev.filter(task => task._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div className="text-center text-2xl font-semibold text-indigo-600 mt-20">Loading your tasks... 🚀</div>;
  if (error) return <div className="text-center text-2xl font-semibold text-red-600 mt-20">Error: {error} 💔</div>;

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-10 min-h-screen">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-900 border-b-4 border-indigo-500 pb-2">
        Your Posted Tasks 📝
      </h2>

      {tasks.length === 0 ? (
        <div className="text-center py-20 bg-white shadow-xl rounded-lg border border-indigo-200">
          <p className="text-2xl text-gray-600 font-medium">You haven't posted any tasks yet.</p>
          <p className="text-gray-400 mt-2">Start your journey by creating a new task!</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-2xl rounded-xl">
          <table className="min-w-full divide-y divide-indigo-200">
            <thead className="bg-indigo-600 text-white shadow-md">
              <tr>
                <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wider rounded-tl-xl">Title</th>
                <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wider">Category</th>
                <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wider">Deadline</th>
                <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wider">Budget</th>
                <th className="py-4 px-6 text-center text-sm font-bold uppercase tracking-wider rounded-tr-xl">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {tasks.map((task, index) => (
                <tr
                  key={task._id}
                  className={`transition-all duration-300 hover:bg-indigo-50 ${index % 2 === 0 ? '' : 'bg-gray-50'}`}
                >
                  <td className="py-4 px-6 font-medium text-gray-900 truncate max-w-xs">{task.title}</td>
                  <td className="py-4 px-6 text-gray-600">
                    <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold px-2 py-1 rounded-full">{task.category}</span>
                  </td>
                  <td className="py-4 px-6 text-gray-500">{new Date(task.deadline).toLocaleDateString()}</td>
                  <td className="py-4 px-6 text-green-600 font-extrabold">${task.budget}</td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-2">
                      {/* Update Button */}
                      <Link
                        to={`/update-task/${task._id}`}
                        className="px-4 py-2 text-sm font-medium bg-[#00A63E] text-white rounded-lg shadow hover:bg-[#008C34] transition duration-150 transform hover:scale-105"
                      >
                        Update
                      </Link>
                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="px-4 py-2 text-sm font-medium bg-[#FF4136] text-white rounded-lg shadow hover:bg-[#D03C32] transition duration-150 transform hover:scale-105"
                      >
                        Delete
                      </button>
                      {/* View Bids Button */}
                      <Link
                        to={`/task-bids/${task._id}`}
                        className="px-4 py-2 text-sm font-medium bg-[#007BFF] text-white rounded-lg shadow hover:bg-[#0056b3] transition duration-150 transform hover:scale-105"
                      >
                        View Bids
                      </Link>
                    </div>
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

export default MyPostedTask;
