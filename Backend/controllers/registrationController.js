// controllers/registrationController.js
import Registration from "../models/registrationModel.js";
import cloudinary from "../config/cloudinary.js"; // uses your cloudinary config
import Event from "../models/eventModel.js"; // optional if you have event model
import User from "../models/userModel.js";

export const createRegistration = async (req, res) => {
  try {
    const userId = req.userId; // set by userAuth
    if (!userId) return res.status(401).json({ success: false, message: "Not logged in" });

    const { eventId, name, email, phone, college, answers, file } = req.body;

    if (!eventId || !name || !email) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Optional: check event capacity
    if (eventId && Event) {
      const event = await Event.findById(eventId);
      if (event) {
        if (event.capacity && event.registeredCount >= event.capacity) {
          return res.status(400).json({ success: false, message: "Event is full" });
        }
      }
    }

    let fileUrl = "";
    let filePublicId = "";

    if (file && file.startsWith("data:image")) {
      // upload base64 image to cloudinary
      const uploadRes = await cloudinary.uploader.upload(file, {
        folder: "registrations",
        resource_type: "image",
      });
      fileUrl = uploadRes.secure_url;
      filePublicId = uploadRes.public_id;
    }

    const reg = new Registration({
      eventId,
      userId,
      name,
      email,
      phone,
      college,
      answers: answers || {},
      fileUrl,
      filePublicId,
    });

    await reg.save();

    // Optional: increment registeredCount on Event
    if (eventId && Event) {
      await Event.findByIdAndUpdate(eventId, { $inc: { registeredCount: 1 } });
    }

    // Optional: notify admin (email or other) here using your nodemailer or templates.

    return res.status(201).json({ success: true, registration: reg });
  } catch (err) {
    console.error("createRegistration error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const getRegistrationsForEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    if (!eventId) return res.status(400).json({ success: false, message: "eventId required" });

    // Only admins or event organizers should fetch — check here if you have roles
    // For simplicity, allow any logged-in user to view registrations for now.
    const regs = await Registration.find({ eventId }).populate("userId", "name email username");
    return res.json({ success: true, data: regs });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
