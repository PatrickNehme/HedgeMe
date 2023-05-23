import authMiddleware from '../authMiddleware';
import fs from 'fs';
import path from 'path';

const uploadsDirectory = path.join(process.cwd(), "uploads");

const handler = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  fs.readdir(uploadsDirectory, { withFileTypes: true }, (err, files) => {
    if (err) {
      res.status(500).json({ message: 'Error while reading the directory' });
      return;
    }

    const fileList = files
      .filter(file => file.isFile())
      .map(file => {
        const stat = fs.statSync(path.join(uploadsDirectory, file.name));
        return {
          name: file.name,
          uploadDate: stat.birthtime, 
        };
      });

    res.status(200).json(fileList);
  });
}
export default authMiddleware(handler, 'admin');
