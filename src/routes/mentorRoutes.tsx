import { Route, Routes } from 'react-router-dom';
import Layout from '../components/layouts/mentor/Layout';

import ProfileContent from '../components/mentor/ProfileContent';
import AccountSettings from '../components/mentor/AccountSettings';
import ProfilePage from '../pages/mentor/ProfilePage';
import SessionAndSubscriptionsPage from '../pages/mentor/SessionAndSubscriptionsPage';
import ProtectMentorLogin from './PrivateRoutes/ProtectMentor';

import BlogList from "@/components/mentor/MyBlogs/BlogList";
import BlogDetails from "@/components/mentor/MyBlogs/BlogDetails";
import CreateBlog from "@/components/mentor/MyBlogs/CreateBlog";
import EditBlog from "@/components/mentor/MyBlogs/EditBlog";
import MyBlogsPage from '@/pages/mentor/MyBlogsPage';

const MentorRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectMentorLogin>
            <Layout />
          </ProtectMentorLogin>
        }
      >
        <Route path="account" element={<ProfileContent />}>
          <Route index element={<ProfilePage />} />
          <Route path="Session&Subscription" element={<SessionAndSubscriptionsPage />} />
          <Route path="MyBlogs" element={<MyBlogsPage/>}>
            <Route index element={<BlogList />} />
            <Route path=":id" element={<BlogDetails />} />
            <Route path="create" element={<CreateBlog />} />
            <Route path="edit/:id" element={<EditBlog />} />
          </Route>
          <Route path="settings" element={<AccountSettings />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default MentorRoutes;
