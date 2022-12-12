import { Request, Response } from 'express';
export const getHome = (req: Request, res: Response): void => {
  res.status(200).render('home', {
    title: 'Image Processing API'
  });
  console.log('home');
};
export default {
  getHome
};
