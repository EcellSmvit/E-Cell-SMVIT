import { useState } from "react";
import { X } from "lucide-react";

const SkillSection = ({ userData, isOwnProfile, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [skills, setSkills] = useState(userData.skills || []);
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };
  const handleDeleteSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleSave = () => {
    onSave({ skills });
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 w-full max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Skills</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mr-2 mb-2"
          >
            {skill}
            {isEditing && (
              <button
                onClick={() => handleDeleteSkill(skill)}
                className="ml-2 text-blue-500 hover:text-red-500 transition-colors rounded-full p-1 focus:outline-none"
                aria-label={`Remove ${skill}`}
                type="button"
              >
                <X size={14} />
              </button>
            )}
          </span>
        ))}
      </div>
      {isEditing && (
        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            placeholder="New Skill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-full max-w-xs"
          />
          <button
            onClick={handleAddSkill}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            type="button"
          >
            Add Skill
          </button>
        </div>
      )}
      {isOwnProfile && (
        <div className="flex gap-2">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              type="button"
            >
              Save Change
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              type="button"
            >
              Edit Skills
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SkillSection;