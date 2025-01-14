import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, MessageCircle } from "lucide-react";
import moment from "moment";

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
  const {
    userid = { _id: '', name: 'Default Name', profilePicture: '' },
    title = 'Default Title',
    tags = [],
    createdAt = '',
    image = '',
  } = post;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card 
      className="w-full border rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white"
      onClick={openModal}
    >
      <CardHeader className="p-4 border-b">
        <div className="flex items-center space-x-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={userid.profilePicture} alt={userid.name} />
            <AvatarFallback>{getInitials(userid.name)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold text-sm text-gray-900">{userid.name}</h3>
            <span className="text-xs text-gray-500">{moment(createdAt).fromNow()}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 truncate mb-2">{title}</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <Badge key={tag._id} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md">
              {tag.name}
            </Badge>
          ))}
        </div>
        <div className="relative w-full h-48 rounded-md overflow-hidden">
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </CardContent>

      <CardFooter className="p-4 border-t flex justify-between">
        <Button variant="ghost" size="sm" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
          <ThumbsUp className="h-4 w-4" />
          Like
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
          <MessageCircle className="h-4 w-4" />
          Comment
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PostCard;