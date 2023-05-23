import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), "uploads");

export default async function upload(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const form = new formidable.IncomingForm({
    uploadDir: uploadDir, 
    keepExtensions: true, 
    preservePath: true, 
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).json({ message: 'Error while parsing the file' });
      return;
    }

    console.log('Files:', files);

    const oldPath = files.file.filepath;
    const newPath = path.join(uploadDir, files.file.originalFilename);

    fs.rename(oldPath, newPath, function (err) {
      if (err) {
        res.status(500).json({ message: 'Error while moving the file' });
        console.error(err);
        return;
      }

      console.log('File renamed and moved successfully');
      res.status(200).json({ message: 'File uploaded successfully', path: newPath });
    });
  });
}
