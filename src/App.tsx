import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

//routes
import AuthRoutes from './routes/AuthRoutes';
import MenteeRoutes from './routes/menteeRoutes';
import MentorRoutes from './routes/mentorRoutes';
import AdminRoutes from './routes/adminRoutes';

const App = () => {
  const router = createBrowserRouter([

    { path: "/*",element: <AuthRoutes/> },
    { path: '/mentee/*', element: <MenteeRoutes/> },
    { path: '/mentor/*', element: <MentorRoutes/> },
    { path: '/admin/*', element: <AdminRoutes/> }
    
  ])
  return (
    <>
    <ToastContainer />
    <RouterProvider router={router}/>
    </>
  )
}

export default App