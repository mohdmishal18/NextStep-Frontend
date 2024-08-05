// MenteeRoutes.js

import { Route, Routes } from 'react-router-dom';
import Layout from '../components/layouts/mentee/Layout';

import ProfileContent from '../components/mentee/ProfileContent';

import DashboardPage from '../pages/mentee/DashboardPage';
import MyFeedPage from '../pages/mentee/MyFeedPage';

import AccountSettings from '../components/mentee/AccountSettings';
import ProfilePage from '../pages/mentee/ProfilePagee';

const MenteeRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<DashboardPage />} />
        <Route path='myfeed' element={<MyFeedPage/>}/>
        <Route path="account" element={<ProfileContent/>}>
          <Route index element={<ProfilePage/>}/>
          <Route path="settings" element={<AccountSettings />} />
        </Route> 
      </Route>
    </Routes>
  );
};

export default MenteeRoutes;
