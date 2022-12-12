import { NextFunction, Request, Response } from 'express';
import { AppError } from './utilities';
//import { AppError } from './utilities';

const globalErrorController = (
  err: AppError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  } else {
    return res.status(200).render('error', {
      title: 'Somthing went very wrong!',
      msg: err.message
    });
  }
};
export default globalErrorController;
