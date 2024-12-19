import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchBlog, createBlog, fetchBlogById, editBlog } from "@/api/blog";
import { blog } from "@/Types/blogTypes";
import { BlogFormProps } from "@/Types/blogTypes";

// Update the type to match the exact structure of your blog type
export const useBlogs = () =>
  useQuery<blog[]>({
    queryKey: ['blogs'],
    queryFn: fetchBlog
  });

export const useCreateBlog = () => {
  const queryClient = useQueryClient();
  return useMutation<blog, Error, BlogFormProps>({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });
};

export const useBlogById = (id?: string) => {
  return useQuery<blog>({
    queryKey: ['blog', id],
    queryFn: () => fetchBlogById(id!),
    enabled: !!id
  });
};

export const useEditBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, blogData }: { id: string; blogData: Partial<blog> }) => {
      console.log("Mutation Fn - Blog Data:", blogData);
      return await editBlog(id, blogData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
    onError: (error) => {
      console.error("Edit Blog Mutation Error:", error);
    }
  });
};