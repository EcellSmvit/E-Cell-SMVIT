import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID missing in request" });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        mobileNumber: user.mobileNumber,
        isAccountVerified: user.isAccountVerified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
    
  } catch (error) {
    console.error("Error in getUserData:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

  
export const getSuggestedUsers = async (req, res) => {
    try {
      const users = await userModel.aggregate([
        { $sample: { size: 3 } },
        {
          $project: {
            password: 0,
            email: 0,
            phone: 0,
            __v: 0
          }
        }
      ]);
      res.json({ success: true, data: users });
    } catch (err) {
      res.status(500).json({ success: false, message: "Error fetching suggested users" });
    }
  };