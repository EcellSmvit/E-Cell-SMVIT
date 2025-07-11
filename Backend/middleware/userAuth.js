import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

const userAuth = async (req, res, next) => {
  const token = req.cookies?.accessToken;

  // Instead of returning 401 for missing token, just set req.user = null and call next()
  // This allows the frontend to check auth status without triggering an error on home page
  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?._id) {
      req.user = null;
      return next();
    }

    const user = await userModel.findById(decoded._id).select('-password');
    if (!user) {
      req.user = null;
      return next();
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("JWT error:", err);
    req.user = null;
    return next();
  }
};

export default userAuth;
