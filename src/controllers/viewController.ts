import { Request, Response } from 'express';
import { catchAsync } from './utilities';

export const getHome = catchAsync(
  async (req: Request, res: Response): Promise<void | Response> => {
    res.status(200).render('home', {
      title: 'Image Processing API'
    });
  }
);
export default {
  getHome
};
