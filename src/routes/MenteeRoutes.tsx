import { Route, Routes } from "react-router-dom"

//pages
import Login from "../pages/mentee/Login"

const MenteeRoutes = () => {
  return (
    <>
    <Routes>
        <Route path="login" element={<Login/>}/>
    </Routes>
    </>
  )
}

export default MenteeRoutes