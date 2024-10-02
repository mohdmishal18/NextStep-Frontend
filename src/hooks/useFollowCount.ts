// useFollowCount.ts
import { useState, useEffect, useCallback } from "react";
import { FollowCount } from "../api/follow";
import { toast } from "react-toastify";

const useFollowCount = (userId: string) => {
  const [followingCount, setFollowingCount] = useState<number | null>(null);
  const [followersCount, setFollowersCount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFollowCount = useCallback(async () => {
    if (!userId) return;
    
    setLoading(true);
    try {
      const response = await FollowCount(userId);
      const { followingCount, followersCount } = response.data.data;

      setFollowingCount(followingCount);
      setFollowersCount(followersCount);
      setError(null);
    } catch (err) {
      console.error("Error fetching follow counts", err);
      setError("Failed to load follower data");
      toast.error("Failed to load follower data.");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchFollowCount();
    }
  }, [userId, fetchFollowCount]);

  return { 
    followingCount, 
    followersCount, 
    loading, 
    error,
    refetch: fetchFollowCount
  };
};

export default useFollowCount;