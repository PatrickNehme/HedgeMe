const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { connectToDb } = require('../../../db');
const { User } = require('../../../models/User');


export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const { email, password } = req.body;

      const db = await connectToDb();
      const userModel = new User(db);

      // Find the user
      const user = await userModel.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ error: 'Email not found' });
      }

      // Verify the password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid password' });
      }

      // Generate a JWT
      const token = jwt.sign({ id: user._id, role: user.role, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Set token in HttpOnly cookie
      res.setHeader('Set-Cookie', `token=${token}; HttpOnly`);

      res.status(200).json({ token });
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error in /api/dashboard/login-user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

