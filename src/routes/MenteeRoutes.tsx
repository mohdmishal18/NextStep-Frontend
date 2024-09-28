// MenteeRoutes.js

import { Route, Routes } from 'react-router-dom';
import Layout from '../components/layouts/mentee/Layout';
import ProtectLogin from './PrivateRoutes/ProtectMentee';

import ProfileContent from '../components/mentee/ProfileContent';

import DashboardPage from '../pages/mentee/DashboardPage';
import MyFeedPage from '../pages/mentee/MyFeedPage';
import AccountSettings from '../components/mentee/AccountSettings';
import ProfilePage from '../pages/mentee/ProfilePagee';
import SearchPage from '../pages/mentee/SearchPage';
import MyPostsPage from '../pages/mentee/MyPostsPage';
import MenteeProfilePage from '../pages/common/MenteeProfile';

const MenteeRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectLogin><Layout/></ProtectLogin>}>
        <Route index element={<DashboardPage />} />
        <Route path='myfeed' element={<MyFeedPage/>}/>
        <Route path='search' element={<SearchPage/>}/>
        <Route path='user-mentee/:id' element={<MenteeProfilePage/>}/>
        <Route path="account" element={<ProfileContent/>}>
          <Route index element={<ProfilePage/>}/>
          <Route path="settings" element={<AccountSettings />} />
          <Route path='myposts' element={<MyPostsPage/>}/>
        </Route> 
      </Route>
    </Routes>
  );
};

export default MenteeRoutes;
