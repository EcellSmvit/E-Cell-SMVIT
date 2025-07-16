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
    <div className="bg-white/70 rounded-2xl shadow-md p-6 mb-8 border border-white/30">
      <h2 className="text-2xl font-bold text-indigo-800 mb-4">About</h2>
      {isOwnProfile ? (
        <>
          {isEditing ? (
            <div>
              <textarea
                className="w-full min-h-[100px] p-3 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white/90 text-gray-800 resize-none mb-3"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Write something about yourself..."
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setAbout(userData.about || "");
                  }}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <p className={`text-gray-700 ${!userData.about ? "italic text-gray-400" : ""}`}>
                {userData.about || "No about information added yet."}
              </p>
              <button
                onClick={() => setIsEditing(true)}
                className="self-start mt-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-medium px-3 py-1.5 rounded-lg transition text-sm"
              >
                Edit
              </button>
            </div>
          )}
        </>
      ) : (
        <p className={`text-gray-700 ${!userData.about ? "italic text-gray-400" : ""}`}>
          {userData.about || "No about information added yet."}
        </p>
      )}
    </div>
  );
};

export default AboutSection;