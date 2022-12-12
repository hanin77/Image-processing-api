import { NextFunction, Request, Response } from 'express';
import sharp, { OutputInfo } from 'sharp';
import fs from 'fs';
import path from 'path';

interface Query {
  filename?: string;
  width?: string;
  height?: string;
}
const formatImg = async (
  formatedImgPath: string,
  query: Query,
  imgPath: string
): Promise<OutputInfo> => {
  return sharp(imgPath)
    .resize(
      parseInt(query.width as string, 10),
      parseInt(query.height as string, 10)
    )
    .toFormat('jpg')
    .jpeg({ quality: 90 })
    .toFile(formatedImgPath);
};
const getImagePath = (imageName: string): string => {
  return path.join(__dirname, `../../../images/${imageName}.jpg`);
};
const getFormatedImagePath = (query: Query): string => {
  return path.join(
    __dirname,
    `../../../images/thumb/${query.filename}-${query.width}x${query.height}.jpg`
  );
};
const isNonValidQuery = (query: Query): boolean | string => {
  if (isNaN(query.width as unknown as number)) {
    return 'please provide valid width';
  } else if (isNaN(query.height as unknown as number)) {
    return 'please provide valid height';
  }
  return false;
};
const isImgExist = (imgPath: string): boolean => {
  return fs.existsSync(imgPath);
};

const catchAsync = (
  fn: (arg0: Request, arg1: Response, arg2: NextFunction) => Promise<unknown>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err: Error) => {
      return next(err);
    });
  };
};
class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export {
  isImgExist,
  isNonValidQuery,
  getFormatedImagePath,
  getImagePath,
  formatImg,
  Query,
  catchAsync,
  AppError
};
