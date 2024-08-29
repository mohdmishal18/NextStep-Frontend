import React from "react";
import moment from "moment";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

interface PostProps {
  post: {
    _id: string;
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
  };
  openModal: () => void;
}

const PostCard: React.FC<PostProps> = ({ post, openModal }) => {
  // Ensure post properties are defined with default values
  const {
    userid = { _id: '', name: 'Default Name', profilePicture: 'default-profile-pic-url' },
    title = 'Default Title',
    tags = [],
    createdAt = '',
    image = 'default-image-url',
  } = post;

  return (
    <div
      className="bg-secondary shadow-md rounded-2xl overflow-hidden cursor-pointer"
      onClick={openModal}
    >
      {/* Profile Picture and User Info */}
      <div className="flex items-start p-4 border-b border-gray-700">
        <img
          src={userid.profilePicture}
          alt={userid.name}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <div className="font-bold text-lg text-white">{userid.name}</div>
          <div className="text-white text-sm">{title}</div>
          <div className="text-white text-xs">
            {moment(createdAt).fromNow()}
          </div>
          <div className="flex gap-2 mt-2">
            {tags.map((tag) => (
              <span key={tag._id} className="text-slate-300 text-xs">
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      </div>
      {/* Post Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-64 object-cover"
      />
      {/* Like and Comment Buttons */}
      <div className="flex justify-between items-center p-4 border-t border-gray-700">
        <button className="text-gray-300 hover:underline flex items-center">
          <ThumbUpAltIcon className="mr-2" />
          Like
        </button>
        <button className="text-gray-300 hover:underline flex items-center">
          <ChatBubbleOutlineIcon className="mr-2" />
          Comment
        </button>
      </div>
    </div>
  );
};

export default PostCard;
