import React, { useEffect, useState } from 'react';
import { GetUserPosts, DeletePost } from '../../api/post';
import { useSelector } from 'react-redux';
import { rootState } from '../../store/store';
import { MenteeProfile } from '../../Types/menteeTypes';
import moment from 'moment';
import { toast } from 'react-toastify';
import EditPostModal from './MyFeed/EditPostModal';
import Swal from 'sweetalert2'; // Import SweetAlert2

// Define the type for a post
interface Post {
  _id: string;  // Change id to _id
  userid: {
    _id: string;
    name: string;
    profilePicture: string;
  };
  title: string;
  tags: { _id: string; name: string }[];
  createdAt: string;
  image: string;
  content: string;
}
const MyPosts: React.FC = () => {
  const mentee: MenteeProfile | null = useSelector(
    (state: rootState) => state.mentee.menteeData
  );

  const [posts, setPosts] = useState<Post[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null); // Track selected post

  const getPosts = async () => {
    try {
      const res = await GetUserPosts(mentee?._id!);
      setPosts(res.data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, [mentee?._id,isModalOpen]);

  const handleEdit = (post: Post) => {
    setSelectedPost(post); // Set the selected post
    setIsModalOpen(true);  // Open the modal
  };

  const extractPublicId = (url: string) => {
    const pattern = /\/(?:v\d+\/)?(?:[^/]+\/)*([^/]+)\.[a-z]+$/;
    const match = pattern.exec(url);
    return match ? match[1] : null;
  };

  const handleDelete = async (postId: string, imageUrl: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'delete',
    });

    if (result.isConfirmed) {
      const publicId = extractPublicId(imageUrl);
      console.log(publicId, "PublicId")
      if (!publicId) {
        toast.error('Could not extract publicId from image URL.');
        return;
      }

      try {
        const res = await DeletePost(postId, publicId);
        if (res.status === 201) {
          getPosts();
          toast.success('Post deleted successfully!');
        }
      } catch (error) {
        console.error("Error deleting post:", error);
        toast.error('Failed to delete the post.');
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPost(null); // Reset the selected post
  };

  const handlePostUpdate = (updatedPost: Post) => {
    setPosts(posts.map(post => post._id === updatedPost._id ? updatedPost : post));  // Update post by _id
  };

  return (
    <div className="p-6 bg-zinc-800 rounded-[40px] w-11/12 ml-10 overflow-y-auto max-h-[139vh]"  style={{ 
      scrollbarWidth: 'none',  /* Firefox */
      msOverflowStyle: 'none'  /* Internet Explorer/Edge */
    }}>
      
      <h2 className="text-white text-2xl mb-6">My Posts</h2>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id} className="p-4 bg-zinc-700 mb-4 rounded-lg overflow-hidden">
            <div className="flex items-start border-b pb-4 mb-4">
              <img src={post.userid.profilePicture} alt={post.userid.name} className="w-12 h-12 rounded-full mr-4" />
              <div>
                <div className="font-bold text-white text-lg">{post.userid.name}</div>
                <div className="text-gray-500 text-sm">{moment(post.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</div>
                <div className="flex text-slate-400 gap-2 mt-2">
                  {post.tags.map((tag) => (
                    <span key={tag._id} className="text-blue-500 text-xs">{tag.name}</span>
                  ))}
                </div>
              </div>
            </div>
            <img src={post.image} alt={post.title} className="w-full h-auto object-cover mb-4" />
            <h3 className="text-xl text-white mb-2">{post.title}</h3>
            <p className="text-zinc-400 break-words">{post.content}</p>
            <div className="mt-4 flex space-x-4">
              <button
                onClick={() => handleEdit(post)}
                className="bg-blue text-white py-2 px-4 rounded-lg"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post._id, post.image)}
                className="bg-red-600 text-white py-2 px-4 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-zinc-400">You have not posted anything yet.</div>
      )}

      {/* Render the edit modal if it's open */}
      {isModalOpen && selectedPost && (
        <EditPostModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          post={selectedPost}
          onSubmitSuccess={handlePostUpdate}  // Handle successful post update
        />
      )}
    </div>
  );
};

export default MyPosts;
