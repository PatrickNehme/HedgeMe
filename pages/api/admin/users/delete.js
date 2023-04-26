import { connectToDb } from '../../../../db';
import { User } from '../../../../models/User';
import authMiddleware from '../../authMiddleware';

const handler = async (req, res) => {
  if (req.method === 'DELETE') {
    const { email } = req.query;

    try {
      const db = await connectToDb();
      const userModel = new User(db);
      await userModel.deleteUserByEmail(email);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error.message);
      console.error(error.stack);
      res.status(500).json({ error: 'An error occurred while deleting the user' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

export default authMiddleware(handler, 'admin');
