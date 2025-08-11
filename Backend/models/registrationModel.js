// models/registrationModel.js
import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
  eventId: { type: mongoose.Types.ObjectId, ref: "Event", required: true }, // if you have Event model
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  college: { type: String },
  answers: { type: mongoose.Schema.Types.Mixed }, // for custom questions
  fileUrl: { type: String }, // cloudinary url
  filePublicId: { type: String }, // cloudinary public id (optional)
  createdAt: { type: Date, default: Date.now },
});

const Registration = mongoose.model("Registration", registrationSchema);
export default Registration;
