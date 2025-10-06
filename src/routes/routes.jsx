import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import BrowseTasks from "../pages/Tasks/BrowseTasks";
import AddTask from "../pages/Tasks/AddTask";
import ProtectedRoute from "../Provider/ProtectedRoute";
import TaskDetails from "../pages/Tasks/TaskDetails";
import UpdateTask from "../pages/Tasks/UpdateTask";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ErrorPage from "../pages/ErrorPage";
import MyPostedTask from "../pages/Tasks/MyPostedTask";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/browse-tasks",
        element: <BrowseTasks />
      },
      {
        path: "/add-task",
        element: <ProtectedRoute><AddTask /></ProtectedRoute>
      },
      {
        path: "/browse-tasks/:id",
        element: <ProtectedRoute><TaskDetails /></ProtectedRoute>
      },
      {
        path: "/my-posted-task",
        element: <ProtectedRoute><MyPostedTask /></ProtectedRoute>
      },
      {
        path: "/update-task/:id",
        element: <ProtectedRoute><UpdateTask/></ProtectedRoute>,
        // 1. Add the loader function here
        loader: ({ params }) =>
          fetch(`https://cluster-connect-server.vercel.app/tasks/${params.id}`).then(res => res.json())

      },

      // Authentication Routes
      {
        path: "auth/login",
        element: <Login />
      },
      {
        path: "auth/register",
        element: <Register />
      }
    ]
  }
]);

export default router;
