import { connectToDb } from '../../../../db';
import { User } from '../../../../models/User';
import authMiddleware from '../../authMiddleware';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const db = await connectToDb();
      const userModel = new User(db);
      const users = await userModel.users.find({}).toArray();
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'An error occurred while fetching users' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default authMiddleware(handler, 'admin');
