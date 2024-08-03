import { Route, Routes } from "react-router-dom";

//pages
import Login from "../pages/mentee/Login";
import SignUp from "../pages/mentee/SignUp";
import Profile from "../pages/mentee/ProfilePage";
import MentorApplyPage from "../pages/mentor/MentorApplyPage";
import OtpPage from "../pages/mentee/OtpPage";
import HomePage from "../pages/common/HomePage";

import Navbar from "../components/common/Navbar";
import { Outlet } from "react-router-dom";

const AuthLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const AuthRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
      <Route path="" element={<HomePage/>}/>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="mentorApply" element={<MentorApplyPage/>}/>
        <Route path="verifyOtp" element={<OtpPage/>}/>
      </Route>
      <Route path="profile" element={<Profile />} />
    </Routes>
  );
};

export default AuthRoutes;
