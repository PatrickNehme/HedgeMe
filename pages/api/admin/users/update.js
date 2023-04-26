import { connectToDb } from '../../../../db';
import { User } from '../../../../models/User';
import authMiddleware from '../../authMiddleware';

const handler = async (req, res) => {
  if (req.method === 'PUT') {
    const { email, newPassword, newRole } = req.body;

    try {
      const db = await connectToDb();
      const userModel = new User(db);
      await userModel.updateUserByEmail(email, newPassword, newRole);
      res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'An error occurred while updating the user' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

export default authMiddleware(handler, 'admin');
