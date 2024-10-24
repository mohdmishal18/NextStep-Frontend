import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getMenteeById } from "../../api/mentee";
import { MenteeProfile as menteeprofile } from "../../Types/menteeTypes";
import { UserPlus2, Users, MessageSquare } from "lucide-react";
import { FollowMentee, UnFollowMentee } from "../../api/follow";
import useMenteeData from "../../hooks/useMenteeData";
import useFollowCount from "../../hooks/useFollowCount";
import useFollowStatus from "../../hooks/usefollowState";

const MenteeProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<menteeprofile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const menteeData = useMenteeData();
  const followerId = menteeData?._id;

  const { 
    followingCount, 
    followersCount, 
    loading: followCountLoading, 
    error: followCountError,
    refetch: refetchFollowCount 
  } = useFollowCount(id!);
  
  const { 
    userFollowing, 
    userFollowingMe, 
    loading: followStatusLoading, 
    error: followStatusError,
    refetch: refetchFollowStatus
  } = useFollowStatus(followerId!, id!);

  const fetchUserData = async () => {
    try {
      const response = await getMenteeById(id!);
      if (response.data.status) {
        setUser(response.data.data);
        console.log(response.data.data, "mentee data")
      } else {
        toast.error("Failed to load user data.");
      }
    } catch (error) {
      console.error("Error fetching user data", error);
      toast.error("Failed to load user data.");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [id]);

  const handleFollow = async () => {
    if (!followerId || !id) return;
    setIsLoading(true);
    try {
      if (userFollowing) {
        await UnFollowMentee(followerId, id);
        toast.success("Unfollowed successfully!");
      } else {
        await FollowMentee(followerId, id);
        toast.success("Followed successfully!");
      }
      
      // Refetch both follow count and status after successful follow/unfollow
      await Promise.all([
        refetchFollowCount(),
        refetchFollowStatus()
      ]);
      
    } catch (error) {
      console.error("Error toggling follow status", error);
      toast.error("Failed to update follow status.");
    } finally {
      setIsLoading(false);
    }
  };

  const StatCard = ({ icon, count, label }: { icon: React.ReactNode, count: number, label: string }) => (
    <div className="flex items-center gap-3 bg-zinc-800 p-4 rounded-lg">
      {icon}
      <div>
        <div className="text-xl font-semibold">{count}</div>
        <div className="text-sm text-gray-400">{label}</div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-zinc-900 rounded-xl overflow-hidden">
      <div className="relative">
        <img
          src={user?.coverPicture || "/defaultCover.jpg"}
          alt="Cover"
          className="w-full h-56 object-cover"
        />
        <div className="absolute left-6 -bottom-16 w-36 h-36 rounded-full border-4 border-zinc-900 overflow-hidden">
          <img
            src={user?.profilePicture || "/defaultProfile.jpg"}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      <div className="pt-20 px-8 pb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {user?.name || "No name available"}
            </h1>
            <p className="text-gray-400 max-w-2xl">
              {user?.bio || "No bio available"}
            </p>
          </div>
          <button
            onClick={handleFollow}
            disabled={isLoading || followStatusLoading}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
              userFollowing 
                ? 'bg-zinc-700 text-gray-300 hover:bg-zinc-600' 
                : 'bg-blue text-white hover:bg-secondary'
            } ${isLoading || followStatusLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading || followStatusLoading ? 'Loading...' : (userFollowing ? 'Unfollow' : 'Follow')}
          </button>
        </div>
        
        <div className="grid grid-cols-3 gap-6">
          <StatCard 
            icon={<MessageSquare className="w-6 h-6 text-blue-400" />} 
            count={user?.postsCount || 0} 
            label="Posts" 
          />
          <StatCard 
            icon={<Users className="w-6 h-6 text-green-400" />} 
            count={followersCount || user?.followersCount || 0}
            label="Followers" 
          />
          <StatCard 
            icon={<UserPlus2 className="w-6 h-6 text-purple-400" />} 
            count={followingCount || user?.followingCount || 0}
            label="Following" 
          />
        </div>
      </div>
    </div>
  );
};

export default MenteeProfile;