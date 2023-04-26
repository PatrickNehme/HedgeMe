import jwt_decode from 'jwt-decode';
import Cookie from 'js-cookie';

const authMiddleware = (handler, requiredRole) => async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    const decodedToken = jwt_decode(token);
    const { role } = decodedToken;

    if (requiredRole && role !== requiredRole) {
      return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
    }

    return handler(req, res);
  } catch (error) {
    console.error('Error decoding token:', error);
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

export default authMiddleware;
