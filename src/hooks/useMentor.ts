import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  mentorApply, 
  SignIn, 
  logout, 
  getMentorById, 
  googleAuthLogin 
} from "@/api/mentor";
import { MentorApplicationData } from "@/Types/mentorTypes";

// Get Mentor by ID query hook
export const useMentorById = (id?: string) => {
  return useQuery({
    queryKey: ['mentor', id],
    queryFn: () => getMentorById(id!),
    enabled: !!id,
    select: (data) => data.data // Assuming your API returns data wrapped in a data property
  });
};

// Mentor Application mutation hook
export const useMentorApplication = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (mentorData: MentorApplicationData) => mentorApply(mentorData),
    onSuccess: () => {
      // Invalidate any relevant queries after successful application
      queryClient.invalidateQueries({ queryKey: ['mentors'] });
    },
    onError: (error) => {
      console.error("Mentor Application Error:", error);
    }
  });
};

// Mentor Sign In mutation hook
export const useMentorSignIn = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => 
      SignIn(email, password),
    onSuccess: (data) => {
      // You might want to store the token or update auth state here
      queryClient.setQueryData(['mentorAuth'], data);
    },
    onError: (error) => {
      console.error("Sign In Error:", error);
    }
  });
};

// Mentor Logout mutation hook
export const useMentorLogout = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // Clear any mentor-related queries from the cache
      queryClient.removeQueries({ queryKey: ['mentor'] });
      queryClient.removeQueries({ queryKey: ['mentorAuth'] });
    },
    onError: (error) => {
      console.error("Logout Error:", error);
    }
  });
};

// Google Auth Login mutation hook
export const useGoogleAuth = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ name, email, image }: { name: string; email: string; image: string }) => 
      googleAuthLogin(name, email, image),
    onSuccess: (data) => {
      // Update auth state after successful Google login
      queryClient.setQueryData(['mentorAuth'], data);
    },
    onError: (error) => {
      console.error("Google Auth Error:", error);
    }
  });
};
