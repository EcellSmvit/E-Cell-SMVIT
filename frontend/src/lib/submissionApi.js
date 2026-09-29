import { ID, Query } from "appwrite";
import { databases } from "./appwriteConfig";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const RECRUITMENT_TABLE_ID =
  import.meta.env.VITE_APPWRITE_RECRUITMENT_TABLE_ID;
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

export const getRecruitmentApplicant = async (userId) => {
  if (!userId) return null;

  const response = await databases.listDocuments(
    DATABASE_ID,
    RECRUITMENT_TABLE_ID,
    [Query.equal("userId", userId)]
  );

  return response.documents[0] || null;
};

export const submitTask = async ({
  taskId,
  userId,
  name,
  usn,
  mobilenumber,
  githubUrl,
  description,
}) => {
  const submittedAt = new Date().toISOString();

  const submissionData = {
    taskId,
    userId,
    name,
    usn,
    mobilenumber,
    githubUrl,
    description: description || "",
    status: "submitted",
    submittedAt,
  };

  const response = await databases.createDocument(
    DATABASE_ID,
    SUBMISSIONS_TABLE_ID,
    ID.unique(),
    submissionData
  );

  try {
    const taskSubmissionWebhook = import.meta.env.VITE_GOOGLE_SHEET_WEBHOOK;

    if (taskSubmissionWebhook) {
      await fetch(taskSubmissionWebhook, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
          formType: "task_submission",
          ...submissionData,
        }),
      });
    } else {
      console.warn(
        "Google Sheet webhook is not configured."
      );
    }
  } catch (sheetError) {
    console.error(
      "Google Sheet sync failed:",
      sheetError
    );
  }

  return response;
};
