import cloudinary from "../config/cloudinary.js"
import userModel from "../models/userModel.js"

export const getPublicProfile = async (req, res) => {
    try {
      const user = await userModel.findOne({ username: req.params.username }).select("-password");
  
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      return res.json({ data: user }); // ✅ Required for frontend
    } catch (error) {
      return res.status(500).json({ success: false, message: "Server error" });
    }
  };
  

  export const updateProfile = async (req, res) => {
    try {
      const allowedFields = [
        "name",
        "username",
        "headline",
        "about",
        "location",
        "skills",
        "experience",
        "education"
      ];
  
      const updatedData = {};
  
      for (const field of allowedFields) {
        if (req.body[field]) {
          updatedData[field] = req.body[field];
        }
      }
  
      // ✅ Upload profile picture only if it's a base64 string
      if (req.body.profilePicture?.startsWith("data:image")) {
        const result = await cloudinary.uploader.upload(req.body.profilePicture, {
          folder: "profile-pictures"
        });
        updatedData.profilePicture = result.secure_url;
      }
  
      // ✅ Upload banner image only if it's a base64 string
      if (req.body.bannerImg?.startsWith("data:image")) {
        const result = await cloudinary.uploader.upload(req.body.bannerImg, {
          folder: "banners"
        });
        updatedData.bannerImg = result.secure_url;
      }
  
      // ✅ Make sure you're using req.userId (not req.user._id)
      const user = await userModel
        .findByIdAndUpdate(req.userId, { $set: updatedData }, { new: true })
        .select("-password");
  
      res.json(user);
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  };