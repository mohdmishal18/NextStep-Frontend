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
        console.log("res for report",res);
        
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
            onClick={() => setShowReportReasons(true)}
            className="ml-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Report
          </button>
        </div>

        {showReportReasons && (
          <div className="mt-4 bg-zinc-800 p-4 rounded">
            <p className="text-white">Select a reason to report this post:</p>
            <ul className="mt-2 space-y-2">
              {reportReasons.map((reason, index) => (
                <li key={index}>
                  <button
                    onClick={() => {
                      setReportReason(reason);
                      handleReportPost(); // Report directly after selecting a reason
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    {reason}
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowReportReasons(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        )}

        <div className="border-t border-gray-700 pt-4 mt-4">
          <h3 className="text-lg text-slate-400 font-bold mb-2">Add a Comment</h3>
          <div className="flex space-x-2">
            <input
              type="text"
              className="flex-1 bg-zinc-800 text-white border border-gray-700 rounded px-4 py-2"
              value={comment}
              onChange={handleCommentChange}
              placeholder="Type your comment..."
            />
            <button
              onClick={handleCommentSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-lg text-white font-bold mb-2">Comments</h3>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment._id} className="bg-zinc-800 p-2 rounded mb-2">
                <div className="flex items-center">
                  <img src={comment.user[0].profilePicture} alt={comment.user[0].name} className="w-8 h-8 rounded-full mr-2" />
                  <div className="flex-1">
                    <span className="font-bold text-white">{comment.user[0].name}</span>
                    <p className="text-gray-400 text-sm">{moment(comment.createdAt).fromNow()}</p>
                    {editingCommentId === comment._id ? (
                      <div className="mt-2 flex">
                        <input
                          type="text"
                          value={editCommentContent}
                          onChange={(e) => setEditCommentContent(e.target.value)}
                          className="bg-zinc-700 text-white border border-gray-600 rounded px-2 py-1 flex-1"
                        />
                        <button onClick={handleEditCommentSubmit} className="bg-green-500 text-white px-2 ml-2 rounded">
                          Save
                        </button>
                      </div>
                    ) : (
                      <p className="text-white mt-2">{comment.content}</p>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <button onClick={() => handleEditComment(comment._id, comment.content)} className="text-blue-500 text-xs">
                      Edit
                    </button>
                    <button onClick={() => handleDeleteComment(comment._id)} className="text-red-500 text-xs">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostModal;
