import React, { useEffect, useState, ChangeEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { getAllSkills } from "../../../api/admin";
import SignupInputField from "../../common/SignupInputField";
import SkillInputField from "../../common/SkillInputField"; // Import the new SkillInputField component
import { MentorApplicationData } from "../../../Types/mentorTypes";

interface ProfileFormProps {
  onSubmit: (data: Partial<MentorApplicationData>) => void;
  onPrevious: (data: Partial<MentorApplicationData>) => void;
  formData: Partial<MentorApplicationData>;
}

interface Skill {
  _id: string;
  name: string;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ onSubmit, onPrevious, formData }) => {
  const { register, handleSubmit, getValues, formState: { errors } } = useForm<Partial<MentorApplicationData>>({
    defaultValues: formData,
  });

  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>(formData.skills || []);
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>([]);

  // Fetch skills from the database on component mount
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await getAllSkills(); // Replace with your API endpoint
        setSkills(response.data.skills);
      } catch (error) {
        console.error("Failed to fetch skills", error);
      }
    };

    fetchSkills();
  }, []);

  // Filter skills based on the input value
  useEffect(() => {
    if (inputValue) {
      const filtered = skills.filter(skill => 
        skill.name.toLowerCase().includes(inputValue.toLowerCase()) &&
        !selectedSkillIds.includes(skill._id)
      );
      setFilteredSkills(filtered);
    } else {
      setFilteredSkills([]);
    }
  }, [inputValue, skills, selectedSkillIds]);

  const handlePrevious = () => {
    const currentData = getValues();
    onPrevious({ ...currentData, skills: selectedSkillIds });
  };

  const submitForm: SubmitHandler<Partial<MentorApplicationData>> = (data) => {
    onSubmit({ ...data, skills: selectedSkillIds });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSkillSelect = (skill: Skill) => {
    setSelectedSkillIds([...selectedSkillIds, skill._id]);
    setInputValue(""); // Clear input after selection
  };

  const handleRemoveSkill = (skillId: string) => {
    setSelectedSkillIds(selectedSkillIds.filter(id => id !== skillId));
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="space-y-4">

      {/* Skills Input */}
      <SkillInputField
        label="Skills"
        placeholder="Start typing to search skills"
        value={inputValue}
        onChange={handleInputChange}
        error={errors.skills}
        skills={skills}
        filteredSkills={filteredSkills}
        onSkillSelect={handleSkillSelect}
      />

       {/* Selected Skills */}
       <div className="flex flex-wrap gap-2 mb-4">
        {selectedSkillIds.map((skillId) => {
          const skill = skills.find(s => s._id === skillId);
          return (
            <div key={skillId} className="bg-gray-200 p-2 rounded flex items-center">
              {skill?.name}
              <button
                type="button"
                onClick={() => handleRemoveSkill(skillId)}
                className="ml-2 text-red-600 hover:text-red-800"
              >
                &times;
              </button>
            </div>
          );
        })}
      </div>

      {/* Other Form Fields */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-grow">
          <SignupInputField
            label="Category"
            placeholder="Enter your category"
            type="text"
            register={register("category", {
              required: "Category is required",
            })}
            error={errors.category}
          />
        </div>
        <div className="flex-grow">
          <SignupInputField
            label="Bio"
            placeholder="Enter your bio"
            type="text"
            register={register("bio", {
              required: "Bio is required",
            })}
            error={errors.bio}
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-grow">
          <SignupInputField
            label="LinkedIn URL"
            placeholder="Enter your LinkedIn URL"
            type="url"
            register={register("linkedInUrl", {
              required: "LinkedIn URL is required",
            })}
            error={errors.linkedInUrl}
          />
        </div>
        <div className="flex-grow">
          <SignupInputField
            label="Personal Website URL"
            placeholder="Enter your personal website URL"
            type="url"
            register={register("personalWebsiteUrl", {
              required: "Personal website URL is required",
            })}
            error={errors.personalWebsiteUrl}
          />
        </div>
      </div>
      
      <div className="flex justify-between mt-4">
        <button type="button" onClick={handlePrevious} className="px-4 py-2 bg-blue text-white rounded hover:bg-blue-600">Previous</button>
        <button type="submit" className="px-4 py-2 bg-blue text-white rounded hover:bg-blue-600">Next</button>
      </div>
    </form>
  );
};

export default ProfileForm;
