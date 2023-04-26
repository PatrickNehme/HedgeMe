import { connectToDb } from '../../../../db';
import { Trade } from '../../../../models/Trades';
import authMiddleware from '../../authMiddleware';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const trade = req.body;

    try {
      const db = await connectToDb();
      const tradeModel = new Trade(db);
      await tradeModel.addTrade(trade);
      res.status(200).json({ message: 'Trade added successfully' });
    } catch (error) {
      console.error('Error adding trade:', error.message);
      console.error(error.stack);
      res.status(500).json({ error: 'An error occurred while adding the trade' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

export default authMiddleware(handler, 'admin');
