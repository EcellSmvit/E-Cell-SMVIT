import { ID, Query } from "appwrite";
import { databases } from "./appwriteConfig";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

const SUBMISSIONS_TABLE_ID =
  import.meta.env.VITE_APPWRITE_SUBMISSIONS_TABLE_ID;

export const getUserSubmission = async (taskId, userId) => {
  const response = await databases.listDocuments(
    DATABASE_ID,
    SUBMISSIONS_TABLE_ID,
    [
      Query.equal("taskId", taskId),
      Query.equal("userId", userId),
    ]
  );

  return response.documents[0] || null;
};

export const submitTask = async ({
  taskId,
  userId,
  githubUrl,
  description,
}) => {
  return await databases.createDocument(
    DATABASE_ID,
    SUBMISSIONS_TABLE_ID,
    ID.unique(),
    {
      taskId,
      userId,
      githubUrl,
      description: description || "",
      status: "submitted",
      submittedAt: new Date().toISOString(),
    }
  );
};