import { connectToDb } from '../../../../../db';
import { Trade } from '../../../../../models/Trades';
import authMiddleware from '../../../authMiddleware';

const handler = async (req, res) => {
  if (req.method === 'PUT') {
    const { id } = req.query;

    try {
      const db = await connectToDb();
      const tradeModel = new Trade(db);
      await tradeModel.closeTrade(id);
      res.status(200).json({ message: 'Trade closed successfully' });
    } catch (error) {
      console.error('Error closing trade:', error);
      res.status(500).json({ error: 'An error occurred while closing the trade' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default authMiddleware(handler, 'admin');
