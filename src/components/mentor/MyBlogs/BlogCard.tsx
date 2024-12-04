import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { blog } from "@/Types/blogTypes";

const BlogCard = ({ blog }: { blog: blog }) => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <h3 className="text-lg font-semibold">{blog.title}</h3>
      </CardHeader>
      <CardContent>
        {blog.coverImage ? (
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-48 object-cover rounded-md"
          />
        ) : (
          <p className="text-sm text-gray-600">No cover image available</p>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link to={`/mentor/account/MyBlogs/${blog._id}`}>
          <Button variant="link" size="sm">
            View
          </Button>
        </Link>
        <Link to={`/mentor/account/MyBlogs/edit/${blog._id}`}>
          <Button variant="outline" size="sm">
            Edit
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
