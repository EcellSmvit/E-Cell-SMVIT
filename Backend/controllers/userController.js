import userModel from '../models/userModel.js';

export const getUserData = async (req, res) => {
    try {
        const userId = req.user.id;
        // Adjust field names if your schema uses different casing
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                mobileNumber: user.mobileNumber,
                username: user.username,
                // Use the correct field name as per your schema
                dateOfBirth: user.dateOfBirth || user.dateofBirth,
                isVerified: user.isVerified,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}