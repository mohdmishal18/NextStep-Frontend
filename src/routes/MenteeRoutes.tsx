import { Route, Routes } from "react-router-dom"

//pages
import Login from "../pages/mentee/Login"
import SignUp from "../pages/mentee/SignUp"

const MenteeRoutes = () => {
  return (
    <>
    <Routes>
        <Route path="login" element={<Login/>}/>
        <Route path="signup" element={<SignUp/>}/>
    </Routes>
    </>
  )
}

export default MenteeRoutes