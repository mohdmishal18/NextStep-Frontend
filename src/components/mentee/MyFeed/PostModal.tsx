import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { toast } from 'react-toastify';
import { createComment, getComment, editComment, deleteComment } from '../../../api/comment';
import { reportPost, UnLikePost, likePost } from '../../../api/post';
import { useSelector } from 'react-redux';
import { rootState } from '../../../store/store';
import { MenteeProfile } from '../../../Types/menteeTypes';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  ThumbsUp,
  Share2,
  Flag,
  MoreVertical,
  Send,
  Edit2,
  Trash2,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };


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
    <Dialog open={true} onOpenChange={closeModal}>
      <DialogContent className="max-w-3xl h-[90vh] flex flex-col">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.userid.profilePicture} alt={post.userid.name} />
              <AvatarFallback>{getInitials(post.userid.name)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <DialogTitle className="mb-1">{post.userid.name}</DialogTitle>
              <div className="text-sm text-muted-foreground">
                {moment(post.createdAt).format('MMMM Do YYYY, h:mm a')}
              </div>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1">
          <div className="space-y-4 p-1">
            {/* Post Content */}
            <div>
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <Badge key={tag._id} variant="secondary">
                    {tag.name}
                  </Badge>
                ))}
              </div>
              {post.image && (
                <div className="relative w-full h-[300px] rounded-md overflow-hidden mb-4">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              )}
              <p className="text-sm text-muted-foreground">{post.content}</p>
            </div>

            <Separator />

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <Button
                variant={isLiked ? "default" : "outline"}
                size="sm"
                onClick={handleLikeToggle}
                className="gap-2"
              >
                <ThumbsUp className="h-4 w-4" />
                <span>{likes}</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="gap-2"
              >
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowReportReasons(true)}
                className="gap-2"
              >
                <Flag className="h-4 w-4" />
                Report
              </Button>
            </div>

            {/* Report Dialog */}
            {showReportReasons && (
              <Card className="mt-4">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">Report Post</h3>
                  <RadioGroup onValueChange={setReportReason}>
                    {reportReasons.map((reason) => (
                      <div key={reason} className="flex items-center space-x-2">
                        <RadioGroupItem value={reason} id={reason} />
                        <Label htmlFor={reason}>{reason}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleReportPost} className="w-full">
                    Submit Report
                  </Button>
                </CardFooter>
              </Card>
            )}

            <Separator />

            {/* Comments Section */}
            <div className="space-y-4">
              <h3 className="font-semibold">Comments</h3>
              
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={handleCommentChange}
                />
                <Button size="icon" onClick={handleCommentSubmit}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <Card key={comment._id}>
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between">
                          <div className="flex gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={comment.user[0].profilePicture} alt={comment.user[0].name} />
                              <AvatarFallback>{getInitials(comment.user[0].name)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">{comment.user[0].name}</p>
                              {editingCommentId === comment._id ? (
                                <div className="flex gap-2 mt-1">
                                  <Input
                                    value={editCommentContent}
                                    onChange={(e) => setEditCommentContent(e.target.value)}
                                  />
                                  <Button size="sm" onClick={handleEditCommentSubmit}>
                                    Save
                                  </Button>
                                </div>
                              ) : (
                                <>
                                  <p className="text-sm text-muted-foreground">{comment.content}</p>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {moment(comment.createdAt).fromNow()}
                                  </p>
                                </>
                              )}
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEditComment(comment._id, comment.content)}>
                                <Edit2 className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleDeleteComment(comment._id)}
                                className="text-destructive"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center">No comments yet.</p>
                )}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default PostModal;