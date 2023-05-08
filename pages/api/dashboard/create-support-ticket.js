import { connectToDb } from '../../../db';
import { User } from '../../../models/User';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { category, message } = req.body;

    const db = await connectToDb();

    const userModel = new User(db);

    const ticket = {
      category,
      message,
      status: 'open',
    };

    const createdTicket = await userModel.createSupportTicket(ticket);

    if (createdTicket) {
      res.status(200).json({ message: 'Support ticket created successfully.' });
    } else {
      res.status(500).json({ message: 'Error creating support ticket.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
};
