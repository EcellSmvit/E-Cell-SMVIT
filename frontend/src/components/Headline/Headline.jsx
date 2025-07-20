import { useState } from "react";

const Headline = ({ headline, isOwnProfile, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedHeadline, setEditedHeadline] = useState(headline || "");

  const handleSave = () => {
    setIsEditing(false);
    onSave({ headline: editedHeadline });
  };

  return (
    <div className="bg-white/30 backdrop-blur-xl rounded-2xl border border-white/20 shadow-[0_8px_24px_rgba(0,0,0,0.08)] p-6 transition-all duration-300 mb-8">
      <h2 className="text-xl md:text-2xl font-bold text-indigo-900 mb-4 tracking-tight">
        Headline
      </h2>

      {isEditing ? (
        <div className="flex flex-col gap-3">
          <input
            type="text"
            value={editedHeadline}
            onChange={(e) => setEditedHeadline(e.target.value)}
            placeholder="Enter your headline"
            className="w-full px-4 py-2 text-sm md:text-base text-gray-800 bg-white/80 rounded-xl border border-indigo-300 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
          <div className="flex gap-3 mt-2">
            <button
              onClick={handleSave}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2 rounded-lg shadow transition"
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditedHeadline(headline || "");
              }}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-5 py-2 rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-start md:items-center gap-4 flex-col md:flex-row">
          <p className={`text-gray-800 text-sm md:text-base ${!headline ? "italic text-gray-400" : ""}`}>
            {headline || "No headline added."}
          </p>
          {isOwnProfile && (
            <button
              onClick={() => setIsEditing(true)}
              className="text-sm font-medium bg-white/60 hover:bg-white/80 text-indigo-700 px-4 py-1.5 rounded-lg border border-white/30 shadow-sm backdrop-blur-md transition"
            >
              Edit Headline
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Headline;
