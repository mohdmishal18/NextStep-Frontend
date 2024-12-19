import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { useEditBlog, useBlogById } from "@/hooks/useBlog";
import BlogForm from "./BlogForm";
import { blog } from "@/Types/blogTypes";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize navigate
  const { data, isLoading, error } = useBlogById(id);
  const blogDataa = data?.data;

  console.log("blog id", id);
  console.log("blog data", data);

  const updateBlog = useEditBlog();

  const handleEdit = (blogData: Partial<blog>) => {
    console.log("Blog ID for Edit:", id);
    console.log("Blog Data for Edit:", blogData);

    // Ensure id is not undefined
    if (!id) {
      console.error("Blog ID is undefined");
      return;
    }

    updateBlog.mutate(
      { 
        id: id, 
        blogData: {
          ...blogData,
          _id: id 
        }
      },
      {
        onSuccess: () => {
          navigate("/mentor/account/MyBlogs"); // Navigate on success
        },
      }
    );
  };

  return <BlogForm initialData={blogDataa} onSubmit={handleEdit} />;
};

export default EditBlog;
