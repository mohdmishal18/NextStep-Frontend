import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'

//routes
import MenteeRoutes from './routes/MenteeRoutes'

const App = () => {
  const router = createBrowserRouter([

    {path: "/*",element: <MenteeRoutes/>}

  ])
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App