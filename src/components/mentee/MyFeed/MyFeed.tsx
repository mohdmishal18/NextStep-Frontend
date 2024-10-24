import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams to get URL parameters
import Post from "./PostCard";
import PostModal from "./PostModal";
import NewPostModal from "./NewPostModal";
import { getAllPosts } from "../../../api/post"; // Import blockPost from API

const MyFeed: React.FC = () => {
  const { postId } = useParams<{ postId?: string }>(); // Get postId from URL
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState<any[]>([]); // Initialize with empty array

  // Fetch posts from backend
  const fetchPosts = async () => {
    try {
      const response = await getAllPosts();
      console.log(response, "res from the backend");
      // Filter posts to include only those that are not blocked
      const filteredPosts = response.data.posts.filter((post: any) => !post.isBlocked);
      setPosts(filteredPosts); // Set only visible posts
      
      // If postId exists, find the post and set it as selected
      if (postId) {
        const postToOpen = filteredPosts.find((post) => post._id === postId);
        if (postToOpen) {
          openModal(postToOpen); // Open the modal with the post details
        }
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [postId]); // Add postId to the dependency array to refetch when it changes

  const openModal = (post: any) => {
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
  };

  const handleNewPostSubmitSuccess = (newPost: any) => {
    fetchPosts();
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
          <div key={post._id} className="relative">
            <Post post={post} openModal={() => openModal(post)} />
          </div>
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
