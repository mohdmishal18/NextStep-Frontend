// MenteeRoutes.js

import { Route, Routes } from 'react-router-dom';
import Layout from '../components/layouts/admin/Layout';

//for layout
import SettingsContent from '../components/admin/Settings/SettingsContent';

//pages
import DashboardPage from '../pages/admin/DashboardPage';
import SkillManagementPage from '../pages/admin/SkillManagementPage';
import LoginPage from '../pages/admin/LoginPage';

const AdminRoutes = () => {
  return (
    <Routes>
        <Route path="/login" element={<LoginPage />}/>
       <Route path="/" element={<Layout />}>
            <Route index element={<DashboardPage />} />
            <Route path='skills' element={<SkillManagementPage />} />

            <Route path="settings" element={<SettingsContent/>}>

            </Route>
        </Route>
    </Routes>
  );
};

export default AdminRoutes;
