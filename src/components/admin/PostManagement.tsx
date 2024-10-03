import React, { useState, useEffect, ChangeEvent } from 'react';
import moment from 'moment';
import { getAllPosts } from '../../api/post';

interface Tag {
  _id: string;
  name: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  profilePicture: string;
}

interface Post {
  _id: string;
  userid: User;
  title: string;
  tags: Tag[];
  createdAt: string;
  image: string;
  content: string;
  likes: number;
  comments: Comment[];
  hidden?: boolean; // Add this property
}

interface Comment {
  id: number;
  user: string;
  profilePicture: string;
  content: string;
  createdAt: Date;
}

const PostManagement: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAllPosts();
        const postsWithHiddenFlag = response.data.posts.map(post => ({ ...post, hidden: false })); // Initialize hidden state
        setPosts(postsWithHiddenFlag);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleViewPost = (post: Post) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPost(null);
  };

  const togglePostVisibility = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post => 
        post._id === postId ? { ...post, hidden: !post.hidden } : post
      )
    );
  };

  const filteredPosts = posts.filter(post =>
    !post.hidden && // Only include visible posts
    (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.name.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  return (
    <div className="p-4">
      <h1 className="text-xl text-white font-bold mb-4">Post Management</h1>
      <input
        type="text"
        placeholder="Search by title or tags"
        value={searchTerm}
        onChange={handleSearchChange}
        className="mb-4 p-2 border rounded"
      />
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        {filteredPosts.length > 0 ? (
          <table className="w-full text-white">
            <thead>
              <tr>
                <th className="p-2 border-b border-gray-700">User</th>
                <th className="p-2 border-b border-gray-700">Created At</th>
                <th className="p-2 border-b border-gray-700">Title</th>
                <th className="p-2 border-b border-gray-700">Tags</th>
                <th className="p-2 border-b border-gray-700">Actions</th>
                <th className="p-2 border-b border-gray-700">Visibility</th> {/* Add Visibility Column */}
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map(post => (
                <tr key={post._id}>
                  <td className="p-2 border-b border-gray-700">{post.userid.name}</td>
                  <td className="p-2 border-b border-gray-700">{moment(post.createdAt).fromNow()}</td>
                  <td className="p-2 border-b border-gray-700">{post.title}</td>
                  <td className="p-2 border-b border-gray-700">
                    {post.tags.map(tag => (
                      <span key={tag._id} className="text-blue-500 text-xs mr-2">{tag.name}</span>
                    ))}
                  </td>
                  <td className="p-2 border-b border-gray-700">
                    <button 
                      onClick={() => handleViewPost(post)} 
                      className="text-blue-400 hover:underline"
                    >
                      See More
                    </button>
                  </td>
                  <td className="p-2 border-b border-gray-700">
                    <button 
                      onClick={() => togglePostVisibility(post._id)} 
                      className={`text-xs ${post.hidden ? 'text-green-400' : 'text-red-400'} hover:underline`}
                    >
                      {post.hidden ? 'Unhide' : 'Hide'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-white">No posts found.</p>
        )}
      </div>

      {showModal && selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-hidden">
          <div
            className="bg-gray-900 rounded-lg w-11/12 md:w-2/3 lg:w-1/2 p-4 max-h-[80vh] overflow-y-scroll"
            style={{
              WebkitOverflowScrolling: 'touch', // For smooth scrolling on iOS
              scrollbarWidth: 'none', // Firefox
              msOverflowStyle: 'none', // IE and Edge
            }}
          >
            {/* Close Button */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg text-white font-bold">{selectedPost.title}</h2>
              <button onClick={closeModal} className="text-gray-700 text-2xl hover:text-gray-900">&times;</button>
            </div>
            {/* Profile Picture and User Info */}
            <div className="flex items-start border-b pb-4 mb-4">
              <img src={selectedPost.userid.profilePicture} alt={selectedPost.userid.name} className="w-12 h-12 rounded-full mr-4" />
              <div>
                <div className="font-bold text-white text-lg">{selectedPost.userid.name}</div>
                <div className="text-gray-500 text-sm">{moment(selectedPost.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</div>
                <div className="flex text-slate-400 gap-2 mt-2">
                  {selectedPost.tags.map(tag => (
                    <span key={tag._id} className="text-blue-500 text-xs">{tag.name}</span>
                  ))}
                </div>
              </div>
            </div>
            {/* Post Image */}
            <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-auto object-cover mb-4" />
            {/* Post Content */}
            <p className="text-sm text-white mb-4">{selectedPost.content}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostManagement;
