import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import authMiddleware from '../authMiddleware';

const unlink = promisify(fs.unlink);

const handler = async (req, res) => {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  
  const { filename } = req.query;
  
  if (!filename) {
    return res.status(400).json({ message: 'Filename is required' });
  }

  const filePath = path.resolve('./uploads', filename);

  try {
    await unlink(filePath);
  } catch (err) {
    console.error(`Failed to delete file ${filename}:`, err);
    return res.status(500).json({ message: 'Failed to delete file' });
  }

  res.status(204).end(); 
}

export default authMiddleware(handler, 'admin');

