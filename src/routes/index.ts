import { Router } from 'express';
import fs from 'fs';
const imagesRouter = Router();
import path from 'path';

imagesRouter.get('/', (req, res) => {
  const { filename, width, height } = req.query;
  if (filename && width && height) {
    const filePath = path.join(__dirname, `../../images/${filename}.jpg`);
    //check if the requested img exist
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        status: 'failed',
        message: 'the requested image to format was not found'
      });
    }
    return res.sendFile(filePath);
  }
  return res.status(400).json({
    status: 'failed',
    message: 'not all required fields where provided'
  });
});

export default imagesRouter;
