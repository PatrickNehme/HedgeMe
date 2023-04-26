import { connectToDb } from '../../../db';

export default async (req, res) => {
  const { email } = req.body;

  const { db } = await connectToDb();
  const user = await db.collection('users').findOne({ email });

  res.status(200).json({ user });
};
