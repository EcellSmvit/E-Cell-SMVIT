import { databases } from "./appwriteConfig";
import { ID } from "appwrite";
import { Query } from "appwrite";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

export const checkIfSubmitted = async (userId) => {
  if(!userId){
    return false;
  }
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [
          Query.equal("userId", userId),
      ]
    );
    return response.total > 0;
  } catch (error) {
    console.error("Error checking submission", error);
    return false;
  }
};

export const submitApplication = async (formData) => {
  try {
    if (!formData.userId) {
      throw new Error("User is not authenticated.");
    }
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

export const getApplicationStatus = async (userId) => {
  if (!userId) {
    return null;
  }

  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [
        Query.equal("userId", userId),
      ]
    );

    if (response.documents.length === 0) {
      return null;
    }

    const application = response.documents[0];

    return {
      name: application.name || "",
      selected: application.selected === true,
      department: application.department || "",
    };

  } catch (error) {
    console.error(
      "Error fetching application status:",
      error
    );

    throw error;
  }
};