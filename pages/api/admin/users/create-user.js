const { connectToDb } = require('../../../../db');
const { User } = require('../../../../models/User');
const { hashPassword } = require('../../../../models/User');
import authMiddleware from '../../authMiddleware';


const handler = async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { email, password, role } = req.body;

      const db = await connectToDb();
      const userModel = new User(db);

      const existingUser = await userModel.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: 'Email is already in use' });
      }

      const hashedPassword = await hashPassword(password);

      const newUser = {
        email,
        password: hashedPassword,
        role: role || 'user', // Set the default role as 'user' if not provided
      };

      const createdUser = await userModel.createUser(newUser);

      if (createdUser) {
        res.status(200).json({ message: 'User created successfully', user: createdUser });
      } else {
        res.status(500).json({ error: 'Unable to create user' });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
  } catch (error) {
    console.error('Error in /api/admin/user/create-User:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
export default authMiddleware(handler, 'admin');

