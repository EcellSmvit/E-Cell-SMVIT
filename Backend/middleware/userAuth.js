import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
  console.log('🔐 Auth Middleware Triggered:', req.method, req.originalUrl);
  console.log('🍪 Cookies:', req.cookies);

  const token = req.cookies.accessToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.userId = decoded.id;

  if (!token) {
    console.log('❌ No accessToken found in cookies');
    return res.status(401).json({ success: false, message: 'Not logged in' });
  }

  console.log('🧪 Verifying token now...');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log('✅ Token verified:', decoded);

    req.userId = decoded.id;
    return next();
  } catch (error) {
    console.log('❌ JWT verification failed:', error.message); // ✅ You MUST see this now
    return res.status(401).json({ success: false, message: error.message });
  }
};

export default userAuth;
