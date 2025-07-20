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
    <div className="bg-white/30 backdrop-blur-xl rounded-2xl border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.1)] p-6 transition-all duration-300 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Briefcase className="text-indigo-700" />
        <h2 className="text-xl md:text-2xl font-bold text-indigo-900">Experience</h2>
      </div>

      {experience.length === 0 && (
        <p className="text-gray-600 italic">No experience added yet.</p>
      )}

      <div className="space-y-4">
        {experience.map((exp, i) => (
          <div
            key={i}
            className="relative bg-white/60 backdrop-blur-lg border border-white/30 rounded-xl p-4 shadow-md"
          >
            <div>
              <h3 className="text-lg font-semibold text-indigo-900">{exp.title}</h3>
              <p className="text-indigo-700 font-medium">{exp.company}</p>
              <p className="text-sm text-gray-600">
                {formatDate(exp.startDate)} –{" "}
                {exp.endDate ? formatDate(exp.endDate) : "Present"}
              </p>
              {exp.description && (
                <p className="text-gray-800 mt-2">{exp.description}</p>
              )}
            </div>
            {isEditing && (
              <button
                onClick={() => handleDeleteExperience(exp._id)}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-600 transition"
              >
                <X size={18} />
              </button>
            )}
          </div>
        ))}
      </div>

      {isEditing && (
        <div className="mt-6 bg-white/40 backdrop-blur-md border border-white/30 rounded-xl p-5 space-y-4 shadow-md">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Title"
              value={newExperience.title}
              onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
              className="flex-1 px-4 py-2 bg-white/80 text-gray-800 rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
            />
            <input
              type="text"
              placeholder="Company"
              value={newExperience.company}
              onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
              className="flex-1 px-4 py-2 bg-white/80 text-gray-800 rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="date"
              value={newExperience.startDate}
              onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
              className="flex-1 px-4 py-2 bg-white/80 text-gray-800 rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
            />
            {!newExperience.currentlyWorking && (
              <input
                type="date"
                value={newExperience.endDate}
                onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
                className="flex-1 px-4 py-2 bg-white/80 text-gray-800 rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
              />
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="currentlyWorking"
              checked={newExperience.currentlyWorking}
              onChange={handleCurrentlyWorkingChange}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor="currentlyWorking" className="text-sm text-gray-800">
              I currently work here
            </label>
          </div>

          <textarea
            placeholder="Description"
            value={newExperience.description}
            onChange={(e) =>
              setNewExperience({ ...newExperience, description: e.target.value })
            }
            className="w-full min-h-[80px] px-4 py-2 bg-white/80 text-gray-800 rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm resize-y"
          />

          <button
            onClick={handleAddExperience}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg shadow transition font-medium"
          >
            Add Experience
          </button>
        </div>
      )}

      {isOwnProfile && (
        <div className="mt-6 flex gap-4">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow transition font-medium"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg shadow transition font-medium"
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
