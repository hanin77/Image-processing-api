import { Request, Response } from 'express';

import {
  isImgExist,
  isNonValidQuery,
  getFormatedImagePath,
  getImagePath,
  formatImg,
  Query,
  catchAsync
} from './utilities';

export const getFormattedImage = catchAsync(
  async (req: Request, res: Response): Promise<void | Response> => {
    const query: Query = req.query;
    if (query.filename && query.width && query.height) {
      const imgPath = getImagePath(query.filename);
      //return 404 erro if the requested img not found
      if (!isImgExist(imgPath)) {
        return res.status(404).json({
          status: 'fail',
          message: 'the requested image to format was not found'
        });
      }
      //validate query width & height
      const queryNonValid = isNonValidQuery(query);
      if (queryNonValid) {
        return res.status(400).json({
          status: 'fail',
          message: queryNonValid
        });
      }
      const formatedImgPath = getFormatedImagePath(query);
      //return the requested img if the file already formated with requested dim
      if (isImgExist(formatedImgPath)) {
        console.log('img accessed');
        return res.sendFile(formatedImgPath);
      }
      //format the img with provided dim and send it to the client
      console.log('img processed');
      await formatImg(formatedImgPath, query, imgPath);
      return res.sendFile(formatedImgPath);
    }
    return res.status(400).json({
      status: 'fail',
      message: 'not all required fields where provided'
    });
  }
);

export default {
  getFormattedImage
};
