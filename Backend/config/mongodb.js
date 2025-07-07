import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // This assumes your MONGODB_URI does NOT already include a database name.
        // If it does, appending '/ecell' may cause issues.
        mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

export default connectDB;