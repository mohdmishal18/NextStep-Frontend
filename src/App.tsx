import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

//routes
import MenteeRoutes from './routes/MenteeRoutes'

const App = () => {
  const router = createBrowserRouter([

    {path: "/*",element: <MenteeRoutes/>}

  ])
  return (
    <>
    <ToastContainer />
    <RouterProvider router={router}/>
    </>
  )
}

export default App