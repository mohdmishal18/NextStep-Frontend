import axios from "axios";

interface CloudinaryUploadResponse {
  secure_url: string;
}

export const uploadImageToCloudinary = async (
  imageFile: File,
  folder: string = "NextStepPosts",
  uploadPreset: string = "NextStepPosts",
  cloudName: string = "mohdmishal"
): Promise<string> => {
  const validTypes = ["image/jpeg", "image/png", "image/jpg"];
  
  if (!validTypes.includes(imageFile.type)) {
    throw new Error("Only JPEG, PNG, and JPG files are allowed.");
  }

  if (imageFile.size > 10 * 1024 * 1024) {
    throw new Error("File size should not exceed 10MB.");
  }

  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", uploadPreset);
  formData.append("cloud_name", cloudName);
  formData.append("folder", folder);

  try {
    const response = await axios.post<CloudinaryUploadResponse>(
      "https://api.cloudinary.com/v1_1/mohdmishal/image/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.secure_url;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw new Error("Image upload failed");
  }
};
