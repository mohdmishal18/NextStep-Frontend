import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { createComment, getComment } from '../../../api/comment';
import { useSelector } from 'react-redux';
import { rootState } from '../../../store/store';
import { MenteeProfile } from '../../../Types/menteeTypes';

interface Comment {
  _id: string; // Changed to _id to match API response
  user: {
    _id: string;
    name: string;
    profilePicture: string;
  };
  content: string;
  createdAt: string; // Changed to string to match API response format
}

interface ModalProps {
  post: {
    _id: string;
    userid: {
      _id: string;
      name: string;
      email: string;
      profilePicture: string;
    };
    title: string;
    tags: { _id: string; name: string }[];
    createdAt: string;
    image: string;
    content: string;
    likes: number;
    comments: Comment[];
  };
  closeModal: () => void;
}

const PostModal: React.FC<ModalProps> = ({ post, closeModal }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>(post.comments || []);
  
  const mentee: MenteeProfile | null = useSelector(
    (state: rootState) => state.mentee.menteeData
  );

  useEffect(() => {
    // Fetch comments when the modal opens
    const fetchComments = async () => {
      try {
        const res = await getComment(post._id);
        console.log(res, 'res for get comment');
        setComments(res?.data.comments || []); // Fixed key to `comments`
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();

    // Prevent background scrolling when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      // Restore background scrolling when modal is closed
      document.body.style.overflow = 'auto';
    };
  }, [post._id]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (comment.trim()) {
      try {
        const userId = mentee?._id; // Replace with actual user ID
        const res = await createComment(post._id, comment, userId!);
        console.log(res, 'res for create comment');
        const newComment: Comment = {
          _id: res.data.comment._id, // Ensure to match the API response structure
          user: {
            _id: userId!,
            name: 'You', // Replace with the current user if needed
            profilePicture: 'https://via.placeholder.com/50', // Replace with the current user's profile picture
          },
          content: comment,
          createdAt: new Date().toISOString(), // Ensure date format is consistent
        };
        setComments([...comments, newComment]);
        setComment('');
      } catch (error) {
        console.error('Error posting comment:', error);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-hidden">
      <div
        className="bg-primary rounded-lg w-11/12 md:w-2/3 lg:w-1/2 p-4 max-h-[80vh] overflow-y-scroll"
        style={{
          WebkitOverflowScrolling: 'touch', // For smooth scrolling on iOS
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // IE and Edge
        }}
      >
        {/* Close Button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg text-white font-bold">{post.title}</h2>
          <button onClick={closeModal} className="text-gray-700 text-2xl hover:text-gray-900">&times;</button>
        </div>
        {/* Profile Picture and User Info */}
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
        {/* Post Image */}
        <img src={post.image} alt={post.title} className="w-full h-auto object-cover mb-4" />
        {/* Post Content */}
        <p className="text-sm text-white mb-4">{post.content}</p>
        {/* Like Button */}
        <div className="flex items-center mb-4">
          <button className="bg-blue text-white px-4 py-2 rounded hover:bg-blue-600">
            Like ({post.likes})
          </button>
        </div>
        {/* Comment Input */}
        <div className="border-t pt-4 mt-4">
          <h3 className="text-lg text-slate-400 font-bold mb-2">Add a Comment</h3>
          <input
            type="text"
            value={comment}
            onChange={handleCommentChange}
            className="border p-2 w-full rounded mb-2"
            placeholder="Type your comment here..."
          />
          <button
            onClick={handleCommentSubmit}
            className="bg-blue text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={!comment.trim()} // Disable button if comment is empty
          >
            Post Comment
          </button>
        </div>
        {/* Comments Section */}
        <div className="mt-4">
          <h3 className="text-lg text-white font-bold mb-2">Comments</h3>
          {comments.length > 0 ? (
            comments.map(comment => (
              <div key={comment._id} className="border rounded-lg p-4 mb-4 bg-gray-100">
                <div className="flex items-start mb-2">
                  {/* <img src={comment.user.profilePicture} alt={comment.user.name} className="w-10 h-10 rounded-full mr-4" /> */}
                  <div>
                    <div className="font-bold">{comment.user.name}</div>
                    <div className="text-gray-500 text-xs mb-2">{moment(comment.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</div>
                    <p className="text-gray-700">{comment.content}</p>
                  </div>
                </div>
                {/* <button className="text-blue-500 hover:underline">Reply</button> */}
              </div>
            ))
          ) : (
            <p className="text-gray-600">No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostModal;
