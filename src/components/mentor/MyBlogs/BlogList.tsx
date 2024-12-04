import React from "react";
import { blog } from "@/Types/blogTypes";
import BlogCard from "./BlogCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useBlogs } from "@/hooks/useBlog";

const BlogList = () => {
  const { data: response, isLoading, error } = useBlogs();
  const blogs = response?.data; // Extract the 'data' field containing blogs

  console.log(blogs, "blogs");

  if (isLoading)
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-40 w-full" />
        ))}
      </div>
    );

  if (error) return <div className="text-red-500">Failed to load blogs.</div>;

  if (!Array.isArray(blogs)) {
    return (
      <div className="text-gray-500">
        No blogs found or the data format is incorrect.
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="text-gray-500 text-center mt-8">
        No blogs available. Create your first blog!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {blogs.map((blog: blog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
