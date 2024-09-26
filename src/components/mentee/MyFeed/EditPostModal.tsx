import React, { useEffect, useState, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { postForm } from "../../../Types/postTypes";
import { editPost } from "../../../api/post";
import { toast } from "react-toastify";
import { MenteeProfile } from "../../../Types/menteeTypes";
import { useSelector } from "react-redux";
import { rootState } from "../../../store/store";
import { getAllSkills } from "../../../api/admin";

type EditPostModalProps = {
    isOpen: boolean;
    onClose: () => void;
    post: {
      _id: string;  // Add the _id field here for the post itself
      userid: {
        _id: string;  // User's ID inside the post object
        name: string;
        profilePicture: string;
      };
      title: string;
      image: string;
      tags: { _id: string; name: string }[];  // Each tag has _id and name
      content: string;
    };
    onSubmitSuccess: (updatedPost: any) => void;
  };

interface Skill {
  _id: string;
  name: string;
}

interface SelectedTag {
  id: string;
  name: string;
}

const EditPostModal: React.FC<EditPostModalProps> = ({
  isOpen,
  onClose,
  post,
  onSubmitSuccess,
}) => {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<postForm>();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(post.image || null);
  const [loading, setLoading] = useState<boolean>(false);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>([]);
  const [selectedTags, setSelectedTags] = useState<SelectedTag[]>(
    post.tags.map(tag => ({ id: tag._id, name: tag.name })) || []
  );

  const mentee: MenteeProfile | null = useSelector(
    (state: rootState) => state.mentee.menteeData
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setValue("title", post.title);
      setValue("content", post.content);
      setSelectedTags(post.tags.map(tag => ({ id: tag._id, name: tag.name })));
    } else {
      document.body.style.overflow = "auto";
      reset();
      setImageFile(null);
      setImagePreview(post.image || null);
      setLoading(false);
      setSelectedTags(post.tags.map(tag => ({ id: tag._id, name: tag.name })));
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, post, reset, setValue]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await getAllSkills();
        setSkills(response.data.skills);
      } catch (error) {
        console.error("Failed to fetch skills", error);
      }
    };

    fetchSkills();
  }, []);

  useEffect(() => {
    if (inputValue) {
      const filtered = skills.filter(skill =>
        skill.name.toLowerCase().includes(inputValue.toLowerCase()) &&
        !selectedTags.some(tag => tag.id === skill._id)
      );
      setFilteredSkills(filtered);
    } else {
      setFilteredSkills([]);
    }
  }, [inputValue, skills, selectedTags]);

  const submitHandler = async (data: postForm) => {
    setLoading(true);
    try {
      let imageUrl = post.image || "";
      if (imageFile) {
        const postData = new FormData();
        postData.append("file", imageFile);
        postData.append("upload_preset", "NextStepPosts");
        postData.append("cloud_name", "mohdmishal");
        postData.append("folder", '/NextStepPosts');
  
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/mohdmishal/image/upload",
          postData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
  
        imageUrl = response.data.secure_url;
      }
  
      const updatedPost = {
        ...data,
        _id: post._id, // Add the post ID here
        userid: post.userid._id, // Ensure userid is a string (ID)
        image: imageUrl,
        tags: selectedTags.map(tag => tag.id), // Pass tag IDs as strings
      };
  
      const postResponse = await editPost(updatedPost);
      console.log(postResponse, "res of edit post");
  
      if (postResponse.status === 200) {
        onSubmitSuccess(postResponse.data);
        setLoading(false);
        toast.success("Post updated successfully");
        onClose();
      } else {
        console.error("Failed to update post");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error updating post:", error);
      setLoading(false);
    }
  };
  
  

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSkillSelect = (skill: Skill) => {
    setSelectedTags([...selectedTags, { id: skill._id, name: skill.name }]);
    setInputValue("");
  };

  const handleRemoveTag = (tagId: string) => {
    setSelectedTags(selectedTags.filter(tag => tag.id !== tagId));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center overflow-auto">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg max-h-full overflow-auto">
        <h2 className="text-xl font-semibold mb-4">Edit Post</h2>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              {...register("title", { required: true })}
              className="border border-gray-300 p-2 w-full rounded"
            />
            {errors.title && <p className="text-red-500">Title is required</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Content</label>
            <textarea
              {...register("content", { required: true })}
              className="border border-gray-300 p-2 w-full rounded"
            />
            {errors.content && <p className="text-red-500">Content is required</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Tags</label>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 w-full rounded"
              placeholder="Start typing to search skills"
            />
            {filteredSkills.length > 0 && (
              <ul className="border border-gray-300 rounded bg-white mt-2 max-h-32 overflow-y-auto">
                {filteredSkills.map(skill => (
                  <li
                    key={skill._id}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleSkillSelect(skill)}
                  >
                    {skill.name}
                  </li>
                ))}
              </ul>
            )}
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedTags.map(tag => (
                <div key={tag.id} className="bg-gray-200 p-2 rounded flex items-center">
                  {tag.name}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag.id)}
                    className="ml-2 text-red-600 hover:text-red-800"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 max-w-full h-auto"
              />
            )}
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 p-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 bg-blue text-white p-2 rounded"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPostModal;
