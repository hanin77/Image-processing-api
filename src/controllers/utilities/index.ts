import { Request, Response } from 'express';
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
export {
  isImgExist,
  isNonValidQuery,
  getFormatedImagePath,
  getImagePath,
  formatImg,
  Query
};
