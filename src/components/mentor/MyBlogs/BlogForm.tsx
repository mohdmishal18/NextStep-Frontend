import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import { Input, Checkbox } from "@nextui-org/react";
import { Button } from "@/components/ui/button";
import { uploadImageToCloudinary } from "@/api/ImageUpload";
import { blog, BlogFormProps } from "@/Types/blogTypes";
import { getAllSkills } from "@/api/admin";
import { Skills } from "@/Types/adminTypes";

const BlogForm: React.FC<BlogFormProps> = ({ initialData = {}, onSubmit }) => {

  console.log(initialData, "initial data");
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<Omit<blog, "_id" | "authorId" | "createdAt" | "updatedAt">>({
    defaultValues: {
      title: initialData.title || "",
      content: initialData.content || "",
      coverImage: initialData.coverImage || "",
      tags: initialData.tags?.map((tag: any) => tag._id) || [],
      isPublished: initialData.isPublished || false,
    },
    shouldFocusError: false,
  });

  const [skills, setSkills] = useState<Skills[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredSkills, setFilteredSkills] = useState<Skills[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<Skills[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>(initialData.coverImage || "");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await getAllSkills();
        const listedSkills = response.data.skills.filter(
          (skill: Skills) => skill.isListed
        );
        setSkills(listedSkills);

        // Populate selectedSkills from initial data
        if (initialData.tags && initialData.tags.length > 0) {
          const selectedSkillsData = initialData.tags
            .map((tag: any) => listedSkills.find((skill) => skill._id === tag._id))
            .filter(Boolean) as Skills[];
          setSelectedSkills(selectedSkillsData);
        }
      } catch (error) {
        console.error("Failed to fetch skills:", error);
      }
    };

    fetchSkills();
  }, []);


  useEffect(() => {
    if (inputValue) {
      const filtered = skills.filter(
        (skill) =>
          skill.name.toLowerCase().includes(inputValue.toLowerCase()) &&
          !selectedSkills.some(
            (selectedSkill) => selectedSkill._id === skill._id
          )
      );
      setFilteredSkills(filtered);
    } else {
      setFilteredSkills([]);
    }
  }, [inputValue, skills, selectedSkills]);

  const handleFormSubmit = async (
    data: Omit<blog, "_id" | "authorId" | "createdAt" | "updatedAt">
  ) => {
    try {
      let coverImage = data.coverImage;
      if (selectedImage) {
        coverImage = await uploadImageToCloudinary(selectedImage);
      }
      const finalData = {
        ...data,
        coverImage,
        tags: selectedSkills.map((skill) => skill._id),
      };

      console.log("Final Form Data:", finalData);

      onSubmit(finalData);
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  const handleSkillSelect = (skill: Skills) => {
    setSelectedSkills([...selectedSkills, skill]);
    setInputValue(""); // Clear input after selection
    setFilteredSkills([]); // Clear filtered skills
  };

  const handleRemoveSkill = (skillId: string) => {
    setSelectedSkills(selectedSkills.filter((skill) => skill._id !== skillId));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Title Input */}
      <div>
        <Input
          {...register("title", { required: "Title is required" })}
          placeholder="Blog Title"
          className="w-full"
          css={{ border: "1px solid gray", borderRadius: "8px" }}
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      {/* Image Selector */}
      <div className="relative w-40 h-40 border-2 border-dashed border-gray-400 rounded-lg">
        {previewImage ? (
          <img
            src={previewImage}
            alt="Selected"
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-500">
            Select an image
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>

      {/* Skills Selection */}
      <div>
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Start typing to search tags"
          className="w-full"
          css={{ border: "1px solid gray", borderRadius: "8px" }}
        />

        {/* Filtered Skills Dropdown */}
        {filteredSkills.length > 0 && (
          <ul className="border border-gray-300 rounded bg-white mt-2 max-h-32 overflow-y-auto">
            {filteredSkills.map((skill) => (
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

        {/* Selected Skills Tags */}
        {/* Selected Skills Tags */}
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedSkills.map((skill) => (
            <div
              key={skill._id}
              className="bg-gray-200 p-2 rounded flex items-center"
            >
              {skill.name}
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill._id)}
                className="ml-2 text-red-600 hover:text-red-800"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Content Editor */}
      <div>
        <Controller
          name="content"
          control={control}
          rules={{ required: "Content is required" }}
          render={({ field }) => {
            let editorRef: any = null;

            return (
              <Editor
                apiKey={import.meta.env.VITE_TINYMCE_APIKEY}
                init={{
                  selector: "textarea#open-source-plugins",
                  plugins:
                    "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion",
                  menubar: "file edit view insert format tools table help",
                  toolbar:
                    "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link image | table media | forecolor backcolor removeformat | charmap emoticons | code fullscreen preview",
                  autosave_ask_before_unload: true,
                  height: 600,
                  image_caption: true,
                  quickbars_selection_toolbar:
                    "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
                  toolbar_mode: "sliding",
                  setup: (editor) => {
                    editorRef = editor;
                  },
                }}
                value={field.value} // Bind the value to the editor
                onEditorChange={(content) => field.onChange(content)} // Update React Hook Form on change
                onBlur={() => field.onBlur()} // Trigger blur for validation
              />
            );
          }}
        />
        {errors.content && (
          <p className="text-red-500 text-sm">{errors.content.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button type="submit" className="bg-blue">
        Save Blog
      </Button>
    </form>
  );
};

export default BlogForm;
