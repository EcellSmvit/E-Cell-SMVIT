import userModel from "../models/userModel";

export const getUserData = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await userModel.findById(userId).populate( 'name _id').populate('name _id');
  
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
      }

      res.json({
        success: true,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
            isVerified: user.isVerified,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }
    });
  
} catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error" }); // ✅ Proper error response
  }
}
  