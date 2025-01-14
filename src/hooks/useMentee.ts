import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  menteeSignup,
  googleAuthRegister,
  signIn,
  logout,
  verifyOtp,
  resendOtp,
  editPictures,
  editDetails,
  googleAuthLogin,
  searchMentee,
  getMenteeById,
} from "@/api/mentee";
import { signUpData, MenteeProfile } from "@/Types/menteeTypes";

// Get Mentee by ID query hook
export const useMenteeById = (id?: string) => {
  return useQuery({
    queryKey: ['mentee', id],
    queryFn: () => getMenteeById(id!),
    enabled: !!id,
    select: (data) => data.data, // Assuming API returns data wrapped in a data property
  });
};

// Mentee Signup mutation hook
export const useMenteeSignup = () => {
  return useMutation({
    mutationFn: (menteeData: signUpData) => menteeSignup(menteeData),
    onError: (error) => {
      console.error("Signup Error:", error);
    },
  });
};

// Google Auth Register mutation hook
export const useGoogleAuthRegister = () => {
  return useMutation({
    mutationFn: ({ name, email, image }: { name: string; email: string; image: string }) =>
      googleAuthRegister(name, email, image),
    onError: (error) => {
      console.error("Google Auth Register Error:", error);
    },
  });
};

// Sign In mutation hook
export const useMenteeSignIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => signIn(email, password),
    onSuccess: (data) => {
      // Update auth state after login
      queryClient.setQueryData(['menteeAuth'], data);
    },
    onError: (error) => {
      console.error("Sign In Error:", error);
    },
  });
};

// Logout mutation hook
export const useMenteeLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // Clear mentee-related queries from cache
      queryClient.removeQueries({ queryKey: ['mentee'] });
      queryClient.removeQueries({ queryKey: ['menteeAuth'] });
    },
    onError: (error) => {
      console.error("Logout Error:", error);
    },
  });
};

// Verify OTP mutation hook
export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: ({ otp, email }: { otp: number; email: string }) => verifyOtp(otp, email),
    onError: (error) => {
      console.error("Verify OTP Error:", error);
    },
  });
};

// Resend OTP mutation hook
export const useResendOtp = () => {
  return useMutation({
    mutationFn: (email: string) => resendOtp(email),
    onError: (error) => {
      console.error("Resend OTP Error:", error);
    },
  });
};

// Edit Pictures mutation hook
export const useEditPictures = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, profilePic, coverPic }: { email: string; profilePic: string; coverPic: string }) =>
      editPictures(email, profilePic, coverPic),
    onSuccess: () => {
      // Optionally refetch mentee profile data
      queryClient.invalidateQueries({ queryKey: ['menteeProfile'] });
    },
    onError: (error) => {
      console.error("Edit Pictures Error:", error);
    },
  });
};

// Edit Details mutation hook
export const useEditDetails = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ name, phone, bio, education, email }: { name: string; phone: string; bio: string; education: string; email: string }) =>
      editDetails(name, phone, bio, education, email),
    onSuccess: () => {
      // Optionally refetch mentee profile data
      queryClient.invalidateQueries({ queryKey: ['menteeProfile'] });
    },
    onError: (error) => {
      console.error("Edit Details Error:", error);
    },
  });
};

// Google Auth Login mutation hook
export const useGoogleAuthLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ name, email, image }: { name: string; email: string; image: string }) =>
      googleAuthLogin(name, email, image),
    onSuccess: (data) => {
      // Update auth state after successful Google login
      queryClient.setQueryData(['menteeAuth'], data);
    },
    onError: (error) => {
      console.error("Google Auth Login Error:", error);
    },
  });
};

// Search Mentee query hook
export const useSearchMentee = (query: string) => {
  return useQuery({
    queryKey: ['searchMentee', query],
    queryFn: () => searchMentee(query),
    enabled: !!query,
    select: (data) => data?.mentees, // Assuming API returns mentees in a property
  });
};
