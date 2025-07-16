import { Briefcase, X } from "lucide-react";
import { useState } from "react";
import { formatDate } from "../../utils/dateUtils.js";

const ExperienceSection = ({ userData, isOwnProfile, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [experience, setExperience] = useState(userData.experience || []);
  const [newExperience, setNewExperience] = useState({
    title: "",
    company: "",
    startDate: "",
    endDate: "",
    description: "",
    currentlyWorking: false,
  });

  const handleAddExperience = () => {
    if (newExperience.title && newExperience.company && newExperience.startDate) {
      setExperience([...experience, newExperience]);
      setNewExperience({
        title: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
        currentlyWorking: false,
      });
    }
  };

  const handleDeleteExperience = (id) => {
    setExperience(experience.filter((exp) => exp._id !== id));
  };

  const handleSave = () => {
    onSave({ experience });
    setIsEditing(false);
  };

  const handleCurrentlyWorkingChange = (e) => {
    setNewExperience({
      ...newExperience,
      currentlyWorking: e.target.checked,
      endDate: e.target.checked ? "" : newExperience.endDate,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <div className="flex items-center mb-4">
        <Briefcase className="text-blue-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">Experience</h2>
      </div>
      {experience.length === 0 && (
        <p className="text-gray-500 mb-4">No experience added yet.</p>
      )}
      <div className="space-y-4">
        {experience.map((exp, i) => (
          <div
            key={i}
            className="relative bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-start"
          >
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{exp.title}</h3>
              <p className="text-gray-700 font-medium">{exp.company}</p>
              <p className="text-gray-500 text-sm">
                {formatDate(exp.startDate)} -{" "}
                {exp.endDate ? formatDate(exp.endDate) : "Present"}
              </p>
              {exp.description && (
                <p className="text-gray-600 mt-2">{exp.description}</p>
              )}
            </div>
            {isEditing && (
              <button
                onClick={() => handleDeleteExperience(exp._id)}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition"
                aria-label="Delete experience"
                type="button"
              >
                <X size={20} />
              </button>
            )}
          </div>
        ))}
      </div>

      {isEditing && (
        <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4">
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <input
              type="text"
              placeholder="Title"
              value={newExperience.title}
              onChange={(e) =>
                setNewExperience({ ...newExperience, title: e.target.value })
              }
              className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Company"
              value={newExperience.company}
              onChange={(e) =>
                setNewExperience({ ...newExperience, company: e.target.value })
              }
              className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <input
              type="date"
              placeholder="Start Date"
              value={newExperience.startDate}
              onChange={(e) =>
                setNewExperience({ ...newExperience, startDate: e.target.value })
              }
              className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {!newExperience.currentlyWorking && (
              <input
                type="date"
                placeholder="End Date"
                value={newExperience.endDate}
                onChange={(e) =>
                  setNewExperience({ ...newExperience, endDate: e.target.value })
                }
                className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="currentlyWorking"
              checked={newExperience.currentlyWorking}
              onChange={handleCurrentlyWorkingChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="currentlyWorking" className="text-gray-700">
              I currently work here
            </label>
          </div>
          <textarea
            placeholder="Description"
            value={newExperience.description}
            onChange={(e) =>
              setNewExperience({ ...newExperience, description: e.target.value })
            }
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y min-h-[80px]"
          />
          <button
            onClick={handleAddExperience}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-semibold"
            type="button"
          >
            Add Experience
          </button>
        </div>
      )}

      {isOwnProfile && (
        <div className="mt-6 flex space-x-4">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition font-semibold"
              type="button"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-semibold"
              type="button"
            >
              Edit Experience
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ExperienceSection;