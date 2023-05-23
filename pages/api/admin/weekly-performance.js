const { connectToDb } = require('../../../db');
const { WeeklyPerformance } = require('../../../models/WeeklyPerformance');
import authMiddleware from '../authMiddleware';

async function handler(req, res) {
    const db = await connectToDb();
  
    if (req.method === 'POST') {
      const performanceModel = new WeeklyPerformance(db);
      const performance = await performanceModel.addPerformance(req.body);
  
      if (!performance) {
        return res.status(400).json({ error: 'Failed to create performance' });
      }
  
      return res.status(201).json(performance);
    }
  
    if (req.method === 'GET') {
      const { month, year } = req.query;
      console.log(`Received month: ${month}, year: ${year}`); // Added logging
  
      const performanceModel = new WeeklyPerformance(db);
      const performances = await performanceModel.getPerformances(month, year);
  
      return res.status(200).json(performances);
    }
  }
  
  export default authMiddleware(handler, 'user');

