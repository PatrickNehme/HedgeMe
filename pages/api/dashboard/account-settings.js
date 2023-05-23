import { connectToDb } from '../../../db';
import { User } from '../../../models/User';
import authMiddleware from '../authMiddleware';

const handler = async (req, res) => {
  const { currentEmail, newEmail, currentPassword } = req.body;

  const dbConnection = await connectToDb();

  // Check if the email exists in the database
  const existingUser = await dbConnection.collection('users').findOne({ email: currentEmail });
  if (!existingUser) {
    res.status(404).json({ message: 'User not found.' });
    return;
  }

  const userModel = new User(dbConnection);
  const isPasswordValid = await userModel.verifyPassword(currentPassword, existingUser.password);
  if (!isPasswordValid) {
    res.status(401).json({ message: 'Incorrect password.' });
    return;
  }

  if (newEmail) {
    await dbConnection.collection('users').updateOne({ email: currentEmail }, { $set: { email: newEmail } });
  }

  res.status(200).json({ message: 'Account settings updated successfully.' });
};

export default authMiddleware(handler, 'user');
