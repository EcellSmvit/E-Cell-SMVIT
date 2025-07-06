import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

// Middleware to authenticate user using JWT from cookies
const userAuth = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access, please login first"
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid token, please login again"
      });
    }

    const user = await userModel.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found"
      });
    }

    // Attach user info to request for downstream use
    req.user = { id: user._id };
    next();
  } catch (err) {
    return res.status(403).json({
      success: false,
      message: "Session expired or invalid. Please login again."
    });
  }
};

export default userAuth;
