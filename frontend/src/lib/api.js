import { databases } from "./appwriteConfig";
import { ID } from "appwrite";
import { Query } from "appwrite";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

export const checkIfSubmitted = async (userId) => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [
        Query.or([
          Query.equal("userId", userId),
          Query.equal("filledByUser", userId)
        ])
      ]
    );
    return response.total > 0;
  } catch (error) {
    console.error("Error checking submission", error);
    throw error;
  }
};

export const submitApplication = async (formData) => {
  try {
    const alreadySubmitted = await checkIfSubmitted(formData.userId);
    if (alreadySubmitted) {
      throw new Error(
        "You have already submitted an application."
      );
    }
    const response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      formData
    );
    try {
      const googleSheetWebhook = import.meta.env.VITE_GOOGLE_SHEET_WEBHOOK;
      if (!googleSheetWebhook) {
        console.warn("Google Sheet webhook is not configured.");
      } else {
        await fetch(googleSheetWebhook, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify(formData),
        });
      }
    } catch (sheetError) {
      console.error("Google Sheet sync failed:",sheetError);

    }
    console.log("Application submitted successfully",response);
    return response;
  } catch (error) {
    console.error("Error submitting application:",error);
    throw error;
  }
};
