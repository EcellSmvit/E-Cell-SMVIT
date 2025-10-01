import { databases, Query } from "./appwriteConfig";
import { ID } from "appwrite";

const DATABASE_ID = "68daf89900282089d321";
const COLLECTION_ID = "ecell_recruitment_data";

// ✅ Check if user has already submitted
export const checkIfSubmitted = async (userId) => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [Query.equal("filledByUser", userId)]
    );
    return response.total > 0; // true if user already submitted
  } catch (error) {
    console.error("Error checking submission", error);
    throw error;
  }
};

// ✅ Submit application
export const submitApplication = async (formData) => {
  try {
    const response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      formData
    );
    console.log("Form submitted successfully", response);
    return response;
  } catch (error) {
    console.error("Error submitting form", error);
    throw error;
  }
};
