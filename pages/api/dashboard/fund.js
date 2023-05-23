const jwt = require('jsonwebtoken');
const { connectToDb } = require('../../../db');
const { Fund } = require('../../../models/Fund');
import Cookie from 'js-cookie';


export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  // Extract token from the authorization header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Missing token' });
  }

  let decoded;

  try {
    // Verify the token and extract the email
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  // The email of the logged-in user
  const email = decoded.email;
  
  const db = await connectToDb();
  const fundModel = new Fund(db);

  try {
    const funds = await fundModel.getAllFunds();
    const userFund = funds.find(fund => fund.email === email);
    if (userFund) {
      return res.status(200).json(userFund);
    } else {
      return res.status(404).json({ error: 'No fund found for the logged in user' });
    }
  } catch (error) {
    console.error('Error while fetching all funds:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
