import React from "react";
import { useParams } from "react-router-dom";
// import { useBlogs, useUpdateBlog } from "../../hooks/useBlogs";
import BlogForm from "./BlogForm";

const EditBlog = () => {
  const { id } = useParams();
  const { data: blogs } = useBlogs();
  const updateBlog = useUpdateBlog();
  const blog = blogs.find((b) => b.id === id);

  const handleEdit = (blogData) => {
    updateBlog.mutate({ id, ...blogData });
  };

  return <BlogForm initialData={blog} onSubmit={handleEdit} />;
};

export default EditBlog;
