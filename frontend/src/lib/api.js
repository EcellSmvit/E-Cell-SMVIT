import { databases } from "./appwriteConfig";
import { ID } from "appwrite";
import { Query } from "appwrite";

const DATABASE_ID = "68daf89900282089d321";
const COLLECTION_ID = "ecell_recruitment_data";

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
      throw new Error("You have already submitted an application.");
    }
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
