import { Query } from "appwrite";
import { databases } from "./appwriteConfig";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const RECRUITMENT_TABLE_ID =import.meta.env.VITE_APPWRITE_RECRUITMENT_TABLE_ID;

export const getSelectedMember = async (userId) => {
  if (!userId) return null;

  const response = await databases.listDocuments(
    DATABASE_ID,
    RECRUITMENT_TABLE_ID,
    [
      Query.equal("userId", userId),
      Query.equal("selected", true),
    ]
  );

  return response.documents[0] || null;
};