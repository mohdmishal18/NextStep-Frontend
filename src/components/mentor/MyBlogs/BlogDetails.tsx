import React from "react";
import { useParams } from "react-router-dom";
import { useBlogById } from "@/hooks/useBlog";
import { Skeleton } from "@/components/ui/skeleton";

const BlogDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useBlogById(id);

  const blogData = data?.data;

  if (isLoading) return <Skeleton className="h-96 w-full" />;
  if (error) return <div className="text-red-500">Failed to load blog details.</div>;
  if (!data) return <div className="text-gray-500">Blog not found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-white text-black rounded-lg shadow-lg">
      {/* Blog Title */}
      <h1 className="text-3xl font-bold">{blogData.title}</h1>

      {/* Cover Image */}
      {blogData.coverImage && (
        <img
          src={blogData.coverImage}
          alt="Cover Image"
          className="w-full h-64 object-cover rounded-md"
        />
      )}

      {/* Published Date */}
      <p className="text-gray-500 text-sm">
        Published on: {new Date(blogData.createdAt).toLocaleDateString()}
      </p>

      {/* Blog Content */}
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: blogData.content }}
      />
    </div>
  );
};

export default BlogDetails;
