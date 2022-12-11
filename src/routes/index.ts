import { Router, Request, Response } from 'express';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
const imagesRouter = Router();
interface Query {
  filename?: string;
  width?: string;
  height?: string;
}
imagesRouter.get(
  '/',
  async (req: Request, res: Response): Promise<void | Response> => {
    const query: Query = req.query;
    if (query.filename && query.width && query.height) {
      const imgPath = path.join(
        __dirname,
        `../../images/${query.filename}.jpg`
      );
      //return 404 erro if the requested img not found
      if (!fs.existsSync(imgPath)) {
        return res.status(404).json({
          status: 'fail',
          message: 'the requested image to format was not found'
        });
      }
      const formatedImgPath = path.join(
        __dirname,
        `../../images/thumb/${query.filename}-${query.width}x${query.height}.jpg`
      );
      //return the requested img if the file already formated with requested dim
      if (fs.existsSync(formatedImgPath)) {
        return res.sendFile(formatedImgPath);
      }
      //format the img with provided dim and send it to the client
      await sharp(imgPath)
        .resize(parseInt(query.width, 10), parseInt(query.height, 10))
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(formatedImgPath);
      return res.sendFile(formatedImgPath);
    }
    return res.status(400).json({
      status: 'fail',
      message: 'not all required fields where provided'
    });
  }
);

export default imagesRouter;
