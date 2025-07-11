import mongoose from 'mongoose';
import userModel from '../models/userModel.js';

export const getUserData = async (req, res) => {
    try {
        // Check if user info exists on request
        if (!req.user || !req.user._id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access"
            });
        }

        const userId = req.user._id;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID format"
            });
        }

        // Fetch user
        const user = await userModel.findById(userId).select(
            '-password -resetOtp -resetOtpExpireAt -verifyotp -verifyotpExpireAt'
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found or deleted"
            });
        }

        // Format response
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

        // Send response
        return res.status(200).json({
            success: true,
            user: sanitizedUser
        });

    } catch (error) {
        console.error('Error in getUserData:', error);
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
};
