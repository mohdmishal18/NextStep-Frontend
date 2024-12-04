import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { NextUIProvider } from "@nextui-org/react"
import { ToastContainer } from 'react-toastify';
import { Toaster } from "@/components/ui/toaster"; // Adjust the path if needed
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
    <NextUIProvider>
      <ToastContainer />
      <Toaster />
      <RouterProvider router={router}/>
    </NextUIProvider>
    </>
  )
}

export default App