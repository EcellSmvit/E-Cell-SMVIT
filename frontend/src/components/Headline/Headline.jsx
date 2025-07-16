import { useState } from "react";

const Headline = ({ headline, isOwnProfile, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedHeadline, setEditedHeadline] = useState(headline || "");

  const handleSave = () => {
    setIsEditing(false);
    onSave({ headline: editedHeadline });
  };

  return (
    <div className="p-4 bg-white rounded-md border shadow-sm dark:bg-gray-900">
      <h2 className="mb-2 text-xl font-semibold">Headline</h2>
      
      {isEditing ? (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={editedHeadline}
            onChange={(e) => setEditedHeadline(e.target.value)}
            className="p-2 rounded-md border dark:bg-gray-800 dark:text-white"
            placeholder="Enter your headline"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-4 py-1 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-1 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <p className="text-gray-700 dark:text-gray-300">
            {headline || "No headline added."}
          </p>
          {isOwnProfile && (
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-600 hover:underline"
            >
              Edit
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Headline;
