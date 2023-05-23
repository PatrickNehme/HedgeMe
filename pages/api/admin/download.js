import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);

export default async function download(req, res) {


  const { filename } = req.query;
  
  if (!filename) {
    return res.status(400).json({ message: 'Filename is required' });
  }

  const filePath = path.resolve('./uploads', filename);

  let file;

  try {
    file = await readFile(filePath);
  } catch (err) {
    console.error(`Failed to read file ${filename}:`, err);
    return res.status(500).json({ message: 'Failed to read file' });
  }

  res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
  res.setHeader('Content-Type', 'application/pdf'); 
  res.send(file);
}
