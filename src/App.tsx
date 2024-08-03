import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

//routes
import AuthRoutes from './routes/authRoutes';

const App = () => {
  const router = createBrowserRouter([

    {path: "/*",element: <AuthRoutes/>}

  ])
  return (
    <>
    <ToastContainer />
    <RouterProvider router={router}/>
    </>
  )
}

export default App