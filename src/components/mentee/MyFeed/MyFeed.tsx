import React, { useState, useEffect } from "react";
import Post from "./PostCard";
import PostModal from "./PostModal";
import NewPostModal from "./NewPostModal";
import { getAllPosts } from "../../../api/post";

const MyFeed: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState<any[]>([]); // Initialize with empty array

  // Fetch posts from backend
  const fetchPosts = async () => {
    try {
      const response = await getAllPosts();
      console.log(response, "res from the backend");
      setPosts(response.data.posts); // Ensure response structure matches
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const openModal = (post: any) => {
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
  };

  const handleNewPostSubmitSuccess = (newPost: any) => {
    fetchPosts()
  };

  return (
    <div className="h-full overflow-y-auto p-4 max-h-[139vh] rounded-b-lg relative">
      <style>
        {`
          .h-full::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>

      <button
        className="absolute top-6 left-4 bg-blue text-white py-2 px-4 rounded shadow-md hover:bg-blue-600"
        onClick={() => setIsModalOpen(true)}
      >
        Create New Post
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-20">
        {posts.map((post) => (
          <Post key={post._id} post={post} openModal={() => openModal(post)} />
        ))}
      </div>

      {selectedPost && (
        <PostModal post={selectedPost} closeModal={closeModal} />
      )}

      <NewPostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmitSuccess={handleNewPostSubmitSuccess}
      />
    </div>
  );
};

export default MyFeed;
