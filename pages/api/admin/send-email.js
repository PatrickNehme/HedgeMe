import nodemailer from 'nodemailer';
import { connectToDb } from '../../../db';
import { User } from '../../../models/User';
import authMiddleware from '../authMiddleware';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { emailTarget, specificEmail, role, subject, body } = req.body;

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  // Connect to the database
  const db = await connectToDb();
  const userModel = new User(db);

  // Fetch email addresses based on the emailTarget and role criteria
  let emailAddresses = [];

  if (emailTarget === 'specific') {
    if (specificEmail) {
      emailAddresses.push(specificEmail);
    }
  } else if (emailTarget === 'all') {
    const users = await userModel.getUsersByRole(role);
    emailAddresses = users.map(user => user.email);
  }

  // Send email to each recipient
  for (const email of emailAddresses) {
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject,
      text: body,
    });
  }

  return res.status(200).json({ message: 'Email sent successfully' });
};

export default authMiddleware(handler, 'admin');
