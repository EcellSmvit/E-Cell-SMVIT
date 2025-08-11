import Registration from "../models/registrationModel.js";
import cloudinary from "../config/cloudinary.js"; 

export const createRegistration = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ success: false, message: "Not logged in" });

    const { eventId, name, email, phone, college, answers, file } = req.body;

    if (!eventId || !name || !email) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    let fileUrl = "";
    let filePublicId = "";

    if (file && file.startsWith("data:image")) {
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
    const regs = await Registration.find({ eventId }).populate("userId", "name email username");
    return res.json({ success: true, data: regs });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
