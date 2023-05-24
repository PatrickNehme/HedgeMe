import { connectToDb } from '../../../db';
import { Trade } from '../../../models/Trades';
import authMiddleware from '../authMiddleware';
import axios from 'axios';

const handler = async (req, res) => {
    if (req.method === 'GET') {
      try {
        const db = await connectToDb();
        const tradeModel = new Trade(db);
        const trades = await tradeModel.trades.find().toArray();
  
        let totalPnL = 0;
        for (const trade of trades) {
          let pnl;
          if (trade.status === 'Open') {
            const livePriceResponse = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${trade.asset}USDT`);
            const livePrice = livePriceResponse.data.price;
            const percentageChange = ((livePrice - Number(trade.entryPrice)) / Number(trade.entryPrice) * 100);
            pnl = trade.strategy === 'Long' ? percentageChange * Number(trade.leverage) : -percentageChange * Number(trade.leverage);
          } else {
            if (trade.closePrice) {
              const percentageChange = ((Number(trade.closePrice) - Number(trade.entryPrice)) / Number(trade.entryPrice) * 100);
              pnl = trade.strategy === 'Long' ? percentageChange * Number(trade.leverage) : -percentageChange * Number(trade.leverage);
            }
          }
          console.log(`Trade: ${JSON.stringify(trade)}, PnL: ${pnl}`);
          if (!isNaN(pnl)) {
            totalPnL += pnl;
          }
        }
  
        console.log(`Total PnL: ${totalPnL}`);
        res.status(200).json({ totalPnL });
  
      } catch (error) {
        console.error('Error fetching trades:', error);
        res.status(500).json({ error: 'An error occurred while fetching trades' });
      }
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  };
  
  export default authMiddleware(handler);
  
  