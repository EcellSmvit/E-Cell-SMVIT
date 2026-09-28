import { Query } from "appwrite";
import { databases } from "./appwriteConfig";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

const TASKS_TABLE_ID =
  import.meta.env.VITE_APPWRITE_TASKS_TABLE_ID;

export const getTasksByDepartment = async (department) => {
  const response = await databases.listDocuments(
    DATABASE_ID,
    TASKS_TABLE_ID,
    [
      Query.equal("department", department),
    ]
  );

  return response.documents;
};

export const getTaskById = async (taskId) => {
  return await databases.getDocument(
    DATABASE_ID,
    TASKS_TABLE_ID,
    taskId
  );
};