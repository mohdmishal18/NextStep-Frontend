import React, { useEffect, useState, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { postForm } from "../../../Types/postTypes";
import { createPost } from "../../../api/post";
import { toast } from "react-toastify";
import { MenteeProfile } from "../../../Types/menteeTypes";
import { useSelector } from "react-redux";
import { rootState } from "../../../store/store";
import { getAllSkills } from "../../../api/admin";
import { Skills } from "@/Types/adminTypes";

type NewPostModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (newPost: any) => void;
};

interface SelectedTag {
  id: string;
  name: string;
}

const NewPostModal: React.FC<NewPostModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
}) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<postForm>();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [skills, setSkills] = useState<Skills[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredSkills, setFilteredSkills] = useState<Skills[]>([]);
  const [selectedTags, setSelectedTags] = useState<SelectedTag[]>([]);
  const [imageError, setImageError] = useState<string | null>(null);

  const mentee: MenteeProfile | null = useSelector(
    (state: rootState) => state.mentee.menteeData
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      reset();
      setImageFile(null);
      setImagePreview(null);
      setLoading(false);
      setSelectedTags([]);
      setImageError(null);
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, reset]);

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

  console.log("fileted skills", filteredSkills)

  const validateImage = (file: File) => {
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      setImageError("Only JPEG, PNG, and JPG files are allowed.");
      return false;
    }

    if (file.size > 10 * 1024 * 1024) {
      setImageError("File size should not exceed 10MB.");
      return false;
    }

    setImageError(null); // Clear any previous errors
    return true;
  };

  const submitHandler = async (data: postForm) => {
    setLoading(true);
    try {
      let imageUrl = "";
      if (imageFile) {
        if (!validateImage(imageFile)) {
          setLoading(false);
          return;
        }
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
      } else {
        toast.error("Please select an image");
        setLoading(false);
        return;
      }

      const newPost = {
        ...data,
        userid: mentee?._id!,
        image: imageUrl,
        tags: selectedTags.map(tag => tag.id), // Pass the IDs of the selected tags
      };

      const postResponse = await createPost(newPost);

      if (postResponse.status == 201) {
        onSubmitSuccess(postResponse.data);
        setLoading(false);
        toast.success("Post created successfully!");
        onClose();
      } else {
        console.error("Failed to create new post");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error creating new post:", error);
      setLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSkillSelect = (skill: Skills) => {
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
      if (!validateImage(file)) {
        return;
      }
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
        <h2 className="text-xl font-semibold mb-4">Create New Post</h2>
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
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {imageError && <p className="text-red-500">{imageError}</p>}
            {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 max-h-40" />}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`${
                loading ? "bg-blue" : "bg-blue hover:bg-blue-600"
              } text-white font-semibold py-2 px-4 rounded`}
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPostModal;
