import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getMenteeById } from "../../api/mentee";
import { MenteeProfile as menteeprofile } from "../../Types/menteeTypes";

const MenteeProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Fetch userId from the route params
  console.log(id)
  
  const [user, setUser] = useState<menteeprofile | null>(null);
  const [isFollowing, setIsFollowing] = useState<boolean>(false); // To manage follow status

  // Fetch user data based on userId
  const fetchUserData = async () => {
    try {
      const response = await getMenteeById(id!);
      console.log(response);
      if (response.data.status) {
        // Set the user state with the data from the API
        setUser(response.data.data);
      } else {
        toast.error("Failed to load user data.");
      }
    } catch (error) {
      console.error("Error fetching user data", error);
      toast.error("Failed to load user data.");
    }
  };

  // Fetch data on rendering the component
  useEffect(() => {
    fetchUserData();
  }, [id]);

  // Follow user handler
  const handleFollow = async () => {
    try {
      await axios.post(`/api/users/${id}/follow`);
      setIsFollowing(true);
      toast.success("You are now following this user!");
    } catch (error) {
      console.error("Error following user", error);
      toast.error("Failed to follow user.");
    }
  };

  return (
    <section className="flex flex-col grow mt-20 w-full rounded-xl bg-zinc-900 max-md:mt-10 max-md:max-w-full">
      <div className="flex relative flex-col rounded-xl bg-zinc-800 max-md:max-w-full">
        <div className="flex flex-col items-start px-5 pt-20 w-full rounded-xl min-h-[250px] max-md:pr-5 max-md:max-w-full">
          <img
            loading="lazy"
            src={user?.coverPicture || "/defaultCover.jpg"}
            alt="Profile background"
            className="object-cover absolute inset-0 w-full h-full rounded-xl"
          />
        </div>
        <div className="z-10 pt-3 pr-3 pb-8 pl-20 mb-0 bg-secondary max-md:pl-5 max-md:mb-2.5 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <div className="flex flex-col w-[84%] max-md:ml-0 max-md:w-full">
              <div className="mt-16 flex flex-col grow items-start font-light text-sky-50 max-md:mt-10 max-md:max-w-full">
                <h2 className="ml-5 text-3xl max-md:ml-2.5">{user?.name || "No name available"}</h2>
                <div className="flex gap-4 px-5 py-2.5 mt-3.5 whitespace-nowrap rounded-xl bg-zinc-900">
                  <div className="flex flex-col">
                    <div className="text-xl">{user?.postsCount || 0}</div>
                    <div className="mt-2.5 text-base">posts</div>
                  </div>
                  <div className="flex flex-col self-start">
                    <div className="text-xl">{user?.followersCount || 0}</div>
                    <div className="mt-2.5 text-base">followers</div>
                  </div>
                  <div className="flex flex-col">
                    <div className="self-center text-xl">
                      {user?.followingCount || 0}
                    </div>
                    <div className="mt-2 text-base">following</div>
                  </div>
                </div>
                <p className="self-stretch mt-5 text-sm leading-3 text-white max-md:max-w-full">
                  {user?.bio || "No bio available"}
                </p>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[10%] max-md:ml-0 max-md:w-full">
              <button
                className="bg-blue text-white p-2 rounded-md"
                onClick={handleFollow}
                disabled={isFollowing}
              >
                {isFollowing ? "Following" : "Follow"}
              </button>
            </div>
          </div>
        </div>
        <div className="absolute left-10 top-40 z-10 w-44 h-44 rounded-full border-[5px] border-zinc-900 object-cover">
          <img
            loading="lazy"
            src={user?.profilePicture || "/defaultProfile.jpg"}
            alt="Profile picture"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default MenteeProfile;
