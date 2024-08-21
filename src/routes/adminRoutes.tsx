// AdminRoutes.js

import { Route, Routes } from 'react-router-dom';
import Layout from '../components/layouts/admin/Layout';

// Pages and Components
import ProtectLogin from './PrivateRoutes/ProtectAdmin';
import DashboardPage from '../pages/admin/DashboardPage';
import SkillManagementPage from '../pages/admin/SkillManagementPage';
import LoginPage from '../pages/admin/LoginPage';
import MentorApplicationsPage from '../pages/admin/MentorApplicationsPage';
import MentorManagementPage from '../pages/admin/MentorManagementPage';
import MenteeManagementPage from '../pages/admin/MenteeManagementPage';
import SettingsContent from '../components/admin/Settings/SettingsContent';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} /> 
      
      {/* Protect all routes under "/" */}
      <Route
        path="/"
        element={
          <ProtectLogin>
            <Layout />
          </ProtectLogin>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="mentors" element={<MentorManagementPage />} />
        <Route path="mentees" element={<MenteeManagementPage />} />
        <Route path="skills" element={<SkillManagementPage />} />
        <Route path="mentor-applications" element={<MentorApplicationsPage />} />
        <Route path="settings" element={<SettingsContent />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
