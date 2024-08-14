import { Route, Routes } from "react-router-dom";

//pages
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import MentorApplyPage from "../pages/mentor/MentorApplyPage";

import ProtectLogin from "./PrivateRoutes/ProtectAuth";

import OtpPage from "../pages/auth/OtpPage";
import HomePage from "../pages/common/HomePage";

import Navbar from "../components/common/Navbar";
import { Outlet } from "react-router-dom";
import ApplySuccess from "../components/mentor/MentorApplySection/ApplySuccess";

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
      <Route path="" element={<ProtectLogin><HomePage/></ProtectLogin>}/>
        <Route path="login" element={<ProtectLogin><Login /></ProtectLogin>} />
        <Route path="signup" element={<ProtectLogin><SignUp /></ProtectLogin>} />
        <Route path="mentorApply" element={<ProtectLogin><MentorApplyPage/></ProtectLogin>}/>
        <Route path="/applySuccess" element={<ApplySuccess/>}/>
        <Route path="verifyOtp" element={<ProtectLogin><OtpPage/></ProtectLogin>}/>
      </Route>
    </Routes>
  );
};

export default AuthRoutes;
