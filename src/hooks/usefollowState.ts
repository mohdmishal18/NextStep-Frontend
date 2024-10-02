// useFollowStatus.ts
import { useState, useEffect, useCallback } from "react";
import { FollowUnFollowStatus } from "../api/follow";
import { toast } from "react-toastify";

const useFollowStatus = (userId: string, followingId: string) => {
  const [userFollowing, setUserFollowing] = useState<boolean>(false);
  const [userFollowingMe, setUserFollowingMe] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFollowStatus = useCallback(async () => {
    if (!userId || !followingId) return;
    
    setLoading(true);
    try {
      const response = await FollowUnFollowStatus(userId, followingId);
      const { userFollowing, userFollowingMe } = response.data.data;

      setUserFollowing(userFollowing);
      setUserFollowingMe(userFollowingMe);
      setError(null);
    } catch (err) {
      console.error("Error fetching follow status", err);
      setError("Failed to load follow status");
      toast.error("Failed to load follow status.");
    } finally {
      setLoading(false);
    }
  }, [userId, followingId]);

  useEffect(() => {
    if (userId && followingId) {
      fetchFollowStatus();
    }
  }, [userId, followingId, fetchFollowStatus]);

  return { 
    userFollowing, 
    userFollowingMe, 
    loading, 
    error,
    refetch: fetchFollowStatus
  };
};

export default useFollowStatus;