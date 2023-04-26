import { connectToDatabase } from '../../../db';
import { hashPassword } from '../../../models/User';

export default async (req, res) => {
  const { email, newEmail, newPassword } = req.body;

  const { db } = await connectToDatabase();

  if (newEmail) {
    await db.collection('users').updateOne({ email }, { $set: { email: newEmail } });
  }

  if (newPassword) {
    const hashedPassword = await hashPassword(newPassword);
    await db.collection('users').updateOne({ email }, { $set: { password: hashedPassword } });
  }

  res.status(200).json({ message: 'Account settings updated successfully.' });
};
