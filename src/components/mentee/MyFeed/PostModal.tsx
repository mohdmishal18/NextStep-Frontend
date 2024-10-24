import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { toast } from 'react-toastify';
import { createComment, getComment, editComment, deleteComment } from '../../../api/comment';
import { reportPost } from '../../../api/post';
import { useSelector } from 'react-redux';
import { rootState } from '../../../store/store';
import { MenteeProfile } from '../../../Types/menteeTypes';
import { UnLikePost, likePost } from '../../../api/post';

interface Comment {
  _id: string;
  content: string;
  createdAt: string;
  user: [{
    _id: string;
    name: string;
    profilePicture: string;
  }];
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
    likedBy: string[];
    comments: Comment[];
  };
  closeModal: () => void;
}

const PostModal: React.FC<ModalProps> = ({ post, closeModal }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>(post.comments || []);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editCommentContent, setEditCommentContent] = useState('');
  const [likes, setLikes] = useState<number>(post.likes);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [reportConfirmation, setReportConfirmation] = useState<boolean>(false);
  const [reportReason, setReportReason] = useState<string | null>(null);
  const [showReportReasons, setShowReportReasons] = useState<boolean>(false);

  const mentee: MenteeProfile | null = useSelector(
    (state: rootState) => state.mentee.menteeData
  );

  const reportReasons = [
    'Spam',
    'Hate Speech',
    'Harassment',
    'Inappropriate Content',
    'False Information',
  ];

  const fetchComments = async () => {
    try {
      const res = await getComment(post._id);
      setComments(res?.data.comments || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    fetchComments();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [post._id]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (comment.trim()) {
      try {
        const userId = mentee?._id;
        const res = await createComment(post._id, comment, userId!);
        if (res.data.status === 'success') {
          setComment(''); // Clear input after submitting
          fetchComments();
        }
      } catch (error) {
        console.error('Error posting comment:', error);
      }
    }
  };

  const handleEditComment = (commentId: string, content: string) => {
    setEditingCommentId(commentId);
    setEditCommentContent(content);
  };

  const handleEditCommentSubmit = async () => {
    if (editCommentContent.trim()) {
      try {
        const res = await editComment(editingCommentId!, editCommentContent);
        if (res.data.status === 'success') {
          fetchComments();
          setEditingCommentId(null);
          setEditCommentContent('');
        }
      } catch (error) {
        console.error('Error editing comment:', error);
      }
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      const res = await deleteComment(commentId);
      if (res.data.status === 'success') {
        fetchComments();
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleLikeToggle = async () => {
    if (!mentee) return;

    try {
      if (isLiked) {
        const res = await UnLikePost(mentee._id, post._id);
        if (res?.data.status === 'success') {
          setLikes((prevLikes) => prevLikes - 1);
          setIsLiked(false);
        }
      } else {
        const res = await likePost(mentee._id, post._id);
        if (res?.data.status === 'success') {
          setLikes((prevLikes) => prevLikes + 1);
          setIsLiked(true);
        }
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleReportPost = async () => {
    if (mentee && reportReason) {
      try {
        const res = await reportPost(post._id, mentee._id, reportReason);
        if (res.data.status === 'success') {
          toast.success('Post reported successfully!');
        } else {
          toast.error('Failed to report the post. Please try again.');
        }
      } catch (error) {
        console.error('Error reporting post:', error);
      } finally {
        setShowReportReasons(false);
        setReportReason(null); // Reset report reason
      }
    }
  };

  // Function to copy the URL to the clipboard
  const handleShare = async () => {
    const url = `http://localhost:3000/mentee/myfeed/${post._id}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Post URL copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy URL. Please try again.');
      console.error('Error copying URL:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-hidden">
      <div
        className="bg-primary rounded-lg w-11/12 md:w-2/3 lg:w-1/2 p-4 max-h-[80vh] overflow-y-scroll"
        style={{
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg text-white font-bold">{post.title}</h2>
          <button onClick={closeModal} className="text-gray-700 text-2xl hover:text-gray-900">&times;</button>
        </div>
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
        <p className="text-sm text-white mb-4">{post.content}</p>
        <div className="flex items-center mb-4">
          <button
            onClick={handleLikeToggle}
            className={`px-4 py-2 rounded ${isLiked ? 'bg-red-500' : 'bg-blue-600'} text-white hover:bg-blue-700`}
          >
            {isLiked ? 'Unlike' : 'Like'} ({likes})
          </button>
          <button
            onClick={handleShare}
            className="ml-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Share
          </button>
          <button
            onClick={() => setShowReportReasons(true)}
            className="ml-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Report
          </button>
        </div>

        {showReportReasons && (
          <div className="mt-4 bg-zinc-800 p-4 rounded">
            <p className="text-white">Select a reason to report this post:</p>
            <ul className="mt-2">
              {reportReasons.map((reason) => (
                <li key={reason} className="flex items-center">
                  <input
                    type="radio"
                    id={reason}
                    name="reportReason"
                    value={reason}
                    onChange={(e) => setReportReason(e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor={reason} className="text-white">{reason}</label>
                </li>
              ))}
            </ul>
            <button onClick={handleReportPost} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
              Submit Report
            </button>
          </div>
        )}

        <div className="mt-4">
          <h3 className="text-white font-bold">Comments</h3>
          <input
            type="text"
            value={comment}
            onChange={handleCommentChange}
            className="w-full p-2 border border-gray-300 rounded mb-2"
            placeholder="Add a comment..."
          />
          <button onClick={handleCommentSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>

          {comments.length > 0 ? (
            <ul className="mt-4">
              {comments.map((comment) => (
                <li key={comment._id} className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <img src={comment.user[0].profilePicture} alt={comment.user[0].name} className="w-8 h-8 rounded-full mr-2" />
                    <div>
                      <span className="font-bold text-white">{comment.user[0].name}</span>
                      <p className="text-gray-300">{comment.content}</p>
                      <span className="text-gray-500 text-xs">{moment(comment.createdAt).fromNow()}</span>
                    </div>
                  </div>
                  <div>
                    <button onClick={() => handleEditComment(comment._id, comment.content)} className="text-blue-500 mr-2">Edit</button>
                    <button onClick={() => handleDeleteComment(comment._id)} className="text-red-500">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostModal;
