import { useState } from "react";

const AboutSection = ({ userData, isOwnProfile, onSave }) => {
  if (!userData) return null;
  const [isEditing, setIsEditing] = useState(false);
  const [about, setAbout] = useState(userData.about || "");

  const handleSave = () => {
    setIsEditing(false);
    onSave({ about });
  };

  return (
    <div className="bg-white/30 backdrop-blur-xl rounded-2xl border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.1)] p-6 transition-all duration-300">
      <h2 className="text-xl md:text-2xl font-bold text-indigo-900 mb-4 tracking-tight">
        About
      </h2>

      {isOwnProfile ? (
        <>
          {isEditing ? (
            <div>
              <textarea
                className="w-full min-h-[120px] p-4 text-sm md:text-base bg-white/80 text-gray-800 rounded-xl border border-indigo-300 shadow-inner resize-none transition focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Write something about yourself..."
              />
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleSave}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2 rounded-lg shadow transition-all"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setAbout(userData.about || "");
                  }}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-5 py-2 rounded-lg transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <p className={`text-gray-800 text-sm md:text-base ${!userData.about ? "italic text-gray-400" : ""}`}>
                {userData.about || "No about information added yet."}
              </p>
              <button
                onClick={() => setIsEditing(true)}
                className="self-start mt-1.5 text-sm bg-white/60 hover:bg-white/80 text-indigo-700 font-medium px-4 py-1.5 rounded-lg shadow-sm border border-white/30 backdrop-blur-md transition"
              >
                Edit About
              </button>
            </div>
          )}
        </>
      ) : (
        <p className={`text-gray-800 text-sm md:text-base ${!userData.about ? "italic text-gray-400" : ""}`}>
          {userData.about || "No about information added yet."}
        </p>
      )}
    </div>
  );
};

export default AboutSection;
