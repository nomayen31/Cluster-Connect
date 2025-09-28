import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import BrowseTasks from "../pages/Tasks/BrowseTasks";
import AddTask from "../pages/Tasks/AddTask";
import ProtectedRoute from "../Provider/ProtectedRoute";
import TaskDetails from "../pages/Tasks/TaskDetails";
import MyTasks from "../pages/Tasks/MyTasks";
import UpdateTask from "../pages/Tasks/UpdateTask";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, 
    errorElement: <ErrorPage/>,
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
        element: <ProtectedRoute><AddTask/></ProtectedRoute> 
      },
      { 
        path: "/task/:id", 
        element: <ProtectedRoute><TaskDetails /></ProtectedRoute> 
      },
      { 
        path: "/my-tasks", 
        element: <ProtectedRoute><MyTasks /></ProtectedRoute> 
      },
      { 
        path: "/update-task/:id", 
        element: <ProtectedRoute><UpdateTask /></ProtectedRoute> 
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
