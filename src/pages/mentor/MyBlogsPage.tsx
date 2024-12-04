import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";

const MyBlogsPage = () => {
  return (
    <div className="container mx-auto px-6 py-8">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">My Blogs</h1>
        <Link to="/mentor/account/MyBlogs/create">
          <Button className="bg-blue">Create New Blog</Button>
        </Link>
      </header>
      <Outlet />
    </div>
  );
};

export default MyBlogsPage;
