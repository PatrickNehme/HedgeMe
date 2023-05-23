import { connectToDb } from '../../../db';
import authMiddleware from '../authMiddleware';


const handler = async (req, res) => {
  const { email } = req.body;

  const { db } = await connectToDb();
  const user = await db.collection('users').findOne({ email });

  res.status(200).json({ user });
};

export default authMiddleware(handler, 'user');
