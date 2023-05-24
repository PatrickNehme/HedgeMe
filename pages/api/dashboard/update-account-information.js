import { connectToDatabase } from '../../../db';
import authMiddleware from '../authMiddleware';

const handler = async (req, res) => {
  if (req.method === 'PUT') {
    const { email, updatedAccountInfo } = req.body;

    const { db } = await connectToDatabase();
    const result = await db.collection('users').updateOne(
      { email },
      {
        $set: {
          assetsUnderManagement: updatedAccountInfo.assetsUnderManagement,
          allocation: updatedAccountInfo.allocation,
          currentMonthProfit: updatedAccountInfo.currentMonthProfit,
        },
      }
    );

    if (result.modifiedCount > 0) {
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ success: false });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default authMiddleware(handler);

