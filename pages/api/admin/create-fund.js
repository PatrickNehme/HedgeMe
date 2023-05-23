const { connectToDb } = require('../../../db');
const { Fund }= require('../../../models/Fund'); 
const { User } = require('../../../models/User'); 




export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).end();
    }
    
    const db = await connectToDb();
    const userModel = new User(db);
    const fundModel = new Fund(db);
  
    const { email, fundName, initialBalance, lowRiskAllocation, mediumRiskAllocation, highRiskAllocation } = req.body;
  
    const user = await userModel.getUserByEmail(email);
    if (!user) {
      return res.status(400).json({ error: 'Invalid email' });
    }
  
    const fund = {
      fundName,
      initialBalance,
      lowRiskAllocation,
      mediumRiskAllocation,
      highRiskAllocation,
      email,
      userId: user._id,
    };
  
    try {
      const createdFund = await fundModel.createFund(fund);
      if (createdFund) {
        return res.status(201).json({ message: 'Fund created successfully' });
      } else {
        throw new Error('Failed to create fund');
      }
    } catch (error) {
      console.error('Error while creating fund:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  

