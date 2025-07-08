import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

// Middleware to authenticate user using JWT from cookies
const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access, please login first"
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token, please login again"
      });
    }

    if (!decoded || (!decoded.id && !decoded._id)) {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload, please login again"
      });
    }

    // Support both id and _id in token payload
    const userId = decoded.id || decoded._id;

    const user = await userModel.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Attach user info to request for downstream use
    req.user = {
      id: user._id,
      isVerified: user.isVerified,
      email: user.email,
      name: user.name,
      username: user.username,
      mobileNumber: user.mobileNumber,
      dateofBirth: user.dateofBirth,
      createdAt: user.createdAt
    };
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error in authentication middleware"
    });
  }
};

export default userAuth;
