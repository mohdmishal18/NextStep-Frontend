import React, { ChangeEvent } from "react";
import { FieldError } from "react-hook-form";

interface SkillInputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: FieldError;
  skills: Skill[];
  filteredSkills: Skill[];
  onSkillSelect: (skill: Skill) => void;
}

interface Skill {
  _id: string;
  name: string;
}

const SkillInputField: React.FC<SkillInputFieldProps> = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  skills,
  filteredSkills,
  onSkillSelect
}) => {
  return (
    <div className="relative">
      <label className="mt-3.5 text-xs text-zinc-200 max-md:max-w-full">
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`px-6 py-3 mt-2.5 border border-solid border-slate-700 leading-[162.5%] rounded-[35px] text-white bg-primary max-md:px-5 max-md:max-w-full w-full ${error ? "pr-12" : "pr-10"}`}
          style={{ minHeight: 'auto' }}
        />
        {filteredSkills.length > 0 && (
          <ul className="absolute z-10 bg-white border border-gray-300 w-full max-h-40 overflow-y-auto mt-1">
            {filteredSkills.map(skill => (
              <li
                key={skill._id}
                onClick={() => onSkillSelect(skill)}
                className="cursor-pointer p-2 hover:bg-gray-200"
              >
                {skill.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && <p className="text-red-600 mt-1">{error.message}</p>}
    </div>
  );
};

export default SkillInputField;
