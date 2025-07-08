import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

// Middleware to authenticate user using JWT from cookies
const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies && req.cookies.token;
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

    if (!decoded || !decoded.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload, please login again"
      });
    }

    const user = await userModel.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Attach user info to request for downstream use
    req.user = { id: user._id, isVerified: user.isVerified, email: user.email };
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error in authentication middleware"
    });
  }
};

export default userAuth;
