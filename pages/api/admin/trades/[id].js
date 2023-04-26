import { connectToDb } from '../../../../db';
import { Trade } from '../../../../models/Trades';
import authMiddleware from '../../authMiddleware';

const handler = async (req, res) => {
    if (req.method === 'PUT') {
      const { id } = req.query;
      const updatedTrade = req.body;
      delete updatedTrade._id;
  
      try {
        const db = await connectToDb();
        const tradeModel = new Trade(db);
        await tradeModel.updateTrade(id, updatedTrade);
        res.status(200).json({ message: 'Trade updated successfully' });
      } catch (error) {
        console.error('Error updating trade:', error);
        res.status(500).json({ error: `An error occurred while updating the trade: ${error.message}` });
      }
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  };
export default authMiddleware(handler, 'admin');
