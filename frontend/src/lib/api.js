import { databases } from "./appwriteConfig";

const DATABASE_ID = "68daf89900282089d321";
const COLLECTION_ID = "ecell_recruitment_data";

export const submitApplication = async (formData) => {
  try {
    const response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      "unique()",
      formData
    );
    console.log("Form submitted successfully", response);
    return response;
  } catch (error) {
    console.error("Error submitting form", error);
    throw error;
  }
};
