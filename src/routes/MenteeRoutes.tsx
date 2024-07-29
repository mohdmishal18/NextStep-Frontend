import { Route, Routes } from "react-router-dom"

//pages
import Login from "../pages/mentee/Login"
import SignUp from "../pages/mentee/SignUp"
import Profile from "../pages/mentee/ProfilePage"

const MenteeRoutes = () => {
  return (
    <>
    <Routes>
        <Route path="login" element={<Login/>}/>
        <Route path="signup" element={<SignUp/>}/>
        <Route path="profile" element={<Profile/>}/>
    </Routes>
    </>
  )
}

export default MenteeRoutes