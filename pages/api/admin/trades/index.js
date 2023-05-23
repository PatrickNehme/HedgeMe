import { connectToDb } from '../../../../db';
import { Trade } from '../../../../models/Trades';
import authMiddleware from '../../authMiddleware';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    const { status, type, dateCreated, strategy } = req.query;
    const filters = {};

    if (status) filters.status = status;
    if (type) filters.type = type;
    if (dateCreated) filters.dateCreated = { $gte: new Date(dateCreated) };
    if (strategy) filters.strategy = strategy;

    try {
      const db = await connectToDb();
      const tradeModel = new Trade(db);
      
      // Retrieve all trades when no filters are provided
      const trades = Object.keys(filters).length === 0 
        ? await tradeModel.trades.find().toArray() 
        : await tradeModel.trades.find(filters).toArray();
      
      res.status(200).json(trades);
    } catch (error) {
      console.error('Error fetching trades:', error);
      res.status(500).json({ error: 'An error occurred while fetching trades' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default authMiddleware(handler, 'admin');
