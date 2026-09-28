import { Query } from "appwrite";
import { databases } from "./appwriteConfig";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const RECRUITMENT_TABLE_ID =import.meta.env.VITE_APPWRITE_RECRUITMENT_TABLE_ID;

export const getSelectedMember = async (userId) => {
  const response = await databases.listDocuments(
    DATABASE_ID,
    RECRUITMENT_TABLE_ID,
    [
      Query.equal("userId", userId),
    ]
  );
  if (response.documents.length === 0) {
    return null;
  }
  const member = response.documents[0];
  if (
    member.selected !== true &&
    member.selectionStatus !== "selected"
  ) {
    return null;
  }
  return member;
};