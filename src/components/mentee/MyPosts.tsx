import React, { useEffect, useState } from 'react';
import { GetUserPosts, DeletePost } from '../../api/post';
import { useSelector } from 'react-redux';
import { rootState } from '../../store/store';
import { MenteeProfile } from '../../Types/menteeTypes';
import moment from 'moment';
import { toast } from 'react-toastify';  // Import react-toastify
import 'react-toastify/dist/ReactToastify.css';

// Define the type for a post
interface Post {
  id: string;
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

  const getPosts = async () => {
    try {
      // Fetch posts from the API
      const res = await GetUserPosts(mentee?._id!);
      console.log(res, 'res from back');

      // Assuming res.data.posts is an array of posts
      setPosts(res.data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, [mentee?._id]);

  const handleEdit = (postId: string) => {
    window.location.href = `/edit-post/${postId}`; // Navigate to the edit page
  };

  const handleDelete = async (postId: string) => {
    try {
      // Call the DeletePost API to delete the post from the server
      const res = await DeletePost(postId);
      console.log(res)
      // Remove the deleted post from the state
    //   setPosts(posts.filter(post => post.id !== postId));
    if(res.status == 201) {
        getPosts()
        toast.success('Post deleted successfully!');
    }

      // Show a success toast
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error('Failed to delete the post.');
    }
  };

  return (
    <div className="p-6 bg-zinc-800 rounded-[40px] w-11/12 ml-10 overflow-y-auto max-h-[139vh]">
      <h2 className="text-white text-2xl mb-6">My Posts</h2>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="p-4 bg-zinc-700 mb-4 rounded-lg overflow-hidden">
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
                onClick={() => handleEdit(post.id)}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post.id)}
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
    </div>
  );
};

export default MyPosts;
