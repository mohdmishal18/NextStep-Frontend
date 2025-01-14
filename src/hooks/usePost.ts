import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  createPost, 
  getAllPosts, 
  GetUserPosts, 
  DeletePost, 
  editPost, 
  likePost, 
  UnLikePost, 
  reportPost, 
  getReports, 
  hidePost 
} from '../api/post';
import { postForm } from '../Types/postTypes';

// Get All Posts Hook
export const usePosts = () =>
  useQuery<postForm[]>({
    queryKey: ['posts'],
    queryFn: getAllPosts,
  });

// Create Post Hook
export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation<postForm, Error, postForm>({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

// Get User's Posts Hook
export const useUserPosts = (userId: string) => {
  return useQuery<postForm[]>({
    queryKey: ['userPosts', userId],
    queryFn: () => GetUserPosts(userId),
    enabled: !!userId,
  });
};

// Delete Post Hook
export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, publicId }: { id: string; publicId: string }) => {
      return await DeletePost(id, publicId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

// Edit Post Hook
export const useEditPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ postData }: { postData: Partial<postForm> }) => {
      return await editPost(postData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

// Like Post Hook
export const useLikePost = () => {
  return useMutation({
    mutationFn: async ({ userid, postid }: { userid: string; postid: string }) => {
      return await likePost(userid, postid);
    },
  });
};

// UnLike Post Hook
export const useUnLikePost = () => {
  return useMutation({
    mutationFn: async ({ userid, postid }: { userid: string; postid: string }) => {
      return await UnLikePost(userid, postid);
    },
  });
};

// Report Post Hook
export const useReportPost = () => {
  return useMutation({
    mutationFn: async ({ postid, userid, reason }: { postid: string; userid: string; reason: string }) => {
      return await reportPost(postid, userid, reason);
    },
  });
};

// Get Reports Hook
export const useReports = () =>
  useQuery({
    queryKey: ['reports'],
    queryFn: getReports,
  });

// Hide Post Hook
export const useHidePost = () => {
  return useMutation({
    mutationFn: async ({ postid, status }: { postid: string; status: boolean }) => {
      return await hidePost(postid, status);
    },
  });
};
