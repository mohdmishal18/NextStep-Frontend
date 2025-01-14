import { useQuery } from '@tanstack/react-query';
import { fetchMentees, fetchMentors, fetchPosts } from '@/api/search';
import { SearchFilters } from '@/Types/mentorTypes';
import { SearchPostFilters } from '@/Types/postTypes';
import { SearchMenteeFilters } from '@/Types/menteeTypes';

export const useMentors = (filters: SearchFilters) => {
  return useQuery({
    queryKey: ['mentors', filters],
    queryFn: () => fetchMentors(filters),
    staleTime: 5000, // Keeps data fresh for 5 seconds before refetching
    retry: 2, // Retry failed requests up to 2 times
    refetchOnWindowFocus: false, // Avoids refetching on window focus
    refetchOnReconnect: true, // Refetches when the network reconnects
    refetchOnMount: false, // Prevents refetching on component mount
  });
};


export const usePosts = (filters: SearchPostFilters) => {
  return useQuery({
    queryKey: ['posts', filters],
    queryFn: () => fetchPosts(filters),
    staleTime: 5000, // Keeps data fresh for 5 seconds before refetching
    retry: 2, // Retry failed requests up to 2 times
    refetchOnWindowFocus: false, // Avoids refetching on window focus
    refetchOnReconnect: true, // Refetches when the network reconnects
    refetchOnMount: false, // Prevents refetching on component mount
  });
};

export const useMentees = (filters: SearchMenteeFilters) => {
  return useQuery({
    queryKey: ['mentees', filters],
    queryFn: () => fetchMentees(filters),
    staleTime: 5000, // Keeps data fresh for 5 seconds before refetching
    retry: 2, // Retry failed requests up to 2 times
    refetchOnWindowFocus: false, // Avoids refetching on window focus
    refetchOnReconnect: true, // Refetches when the network reconnects
    refetchOnMount: false, // Prevents refetching on component mount
  });
};