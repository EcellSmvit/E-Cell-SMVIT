import userModel from '../models/userModel.js';

export const getUserData = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ success: false, message: "Unauthorized access" });
        }
        const userId = req.user.id;

        if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: "Invalid user ID format" });
        }

        const user = await userModel.findById(userId).select('-password -resetOtp -resetOtpExpireAt -verifyotp -verifyotpExpireAt');
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found or deleted" });
        }

        const sanitizedUser = {
            _id: user._id,
            name: user.name || '',
            email: user.email || '',
            mobileNumber: user.mobileNumber || '',
            username: user.username || '',
            dateOfBirth: user.dateofBirth || null,
            isVerified: Boolean(user.isVerified),
            createdAt: user.createdAt || new Date(),
            updatedAt: user.updatedAt || new Date()
        };

        res.json({
            success: true,
            user: sanitizedUser
        });

    } catch (error) {
        console.error('Error in getUserData:', error);
        return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
    }
}