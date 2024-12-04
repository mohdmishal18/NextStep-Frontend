
import BlogForm from "./BlogForm";
import { BlogFormProps } from "@/Types/blogTypes";
import { useCreateBlog } from "@/hooks/useBlog";

const CreateBlog = () => {
  const createBlog = useCreateBlog();

  const handleCreate = (blogData: BlogFormProps) => {
    createBlog.mutate(blogData);
  };

  return <BlogForm onSubmit={handleCreate} />;
};

export default CreateBlog;
