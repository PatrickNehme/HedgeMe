import { connectToDatabase } from '../../../db';

export default async (req, res) => {
  const { category, message } = req.body;

  const { db } = await connectToDatabase();

  await db.collection('support_tickets').insertOne({
    category,
    message,
    createdAt: new Date(),
  });

  res.status(200).json({ message: 'Support ticket submitted successfully.' });
};
