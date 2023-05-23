const { connectToDb } = require('../../../../db');
const { Fund } = require('../../../../models/Fund');

export default async function handler(req, res) {
  const { id } = req.query;
  const db = await connectToDb();
  const fundModel = new Fund(db);

  if (req.method === 'GET') {
    try {
      const fund = await fundModel.getFundById(id);
      if (!fund) {
        return res.status(404).json({ error: 'Fund not found' });
      }
      return res.status(200).json(fund);
    } catch (error) {
      console.error('Error while getting fund:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'PUT') {
    const updatedFund = req.body;

    try {
      const result = await fundModel.updateFund(id, updatedFund);
      if (!result.matchedCount) {
        return res.status(404).json({ error: 'Fund not found' });
      }
      return res.status(200).end();
    } catch (error) {
      console.error('Error while updating fund:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const result = await fundModel.deleteFund(id);
      if (!result.deletedCount) {
        return res.status(404).json({ error: 'Fund not found' });
      }
      return res.status(204).end();
    } catch (error) {
      console.error('Error while deleting fund:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(405).end();
  }
}
