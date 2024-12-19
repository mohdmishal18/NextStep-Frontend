import BlogForm from "./BlogForm";
import { BlogFormProps } from "@/Types/blogTypes";
import { useCreateBlog } from "@/hooks/useBlog";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const CreateBlog = () => {
  const navigate = useNavigate(); // Initialize navigate
  const createBlog = useCreateBlog();

  const handleCreate = (blogData: BlogFormProps) => {
    createBlog.mutate(blogData, {
      onSuccess: () => {
        navigate("/mentor/account/MyBlogs"); // Navigate on success
      },
    });
  };

  return <BlogForm onSubmit={handleCreate} />;
};

export default CreateBlog;
