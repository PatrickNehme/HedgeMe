const { connectToDb } = require('../../../../db')
const { Fund } = require('../../../../models/Fund');
import authMiddleware from '../../authMiddleware';


const handler = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const db = await connectToDb();
  const fundModel = new Fund(db);

  try {
    const funds = await fundModel.getAllFunds();
    return res.status(200).json(funds);
  } catch (error) {
    console.error('Error while fetching all funds:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export default authMiddleware(handler);
