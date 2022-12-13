import { promises as fs, existsSync, mkdirSync } from 'fs';
import path from 'path';
import { formatImg, isNonValidQuery } from '../../../controllers/utilities';
describe('utilities', () => {
  describe('isNonValidQuery', () => {
    it('should return false when provided width and height are coerciable to numbers', () => {
      const result = isNonValidQuery({
        width: '500',
        height: '400'
      });
      expect(result).toBe(false);
    });
    it('should return string <please provide valid width> when provided width is not coerciable to a number', () => {
      const result = isNonValidQuery({
        width: 'kkkk',
        height: '400'
      });
      expect(result).toBe('please provide valid width');
    });
    it('should return string <please provide valid height> when provided width is not coerciable to a number', () => {
      const result = isNonValidQuery({
        width: '700',
        height: 'm'
      });
      expect(result).toBe('please provide valid height');
    });
  });
  describe('formatImg', () => {
    // before each test clean thumb folder content && if folder not found add it
    beforeEach(async () => {
      const thumbPath = path.join(__dirname, `../../../../images/thumb`);
      //clean thumb folder content
      if (existsSync(thumbPath)) {
        for (const file of await fs.readdir(thumbPath)) {
          await fs.unlink(path.join(thumbPath, file));
        }
      } else {
        mkdirSync(thumbPath);
      }
    });
    it('should create the resized img when filename exist and width,height are >0', async () => {
      const filename = 'santamonica';
      const width = '500';
      const height = '400';
      const formatedImgbPath = path.join(
        __dirname,
        `../../../../images/thumb/${filename}-${width}x${height}.jpg`
      );
      const imgPath = path.join(
        __dirname,
        `../../../../images/${filename}.jpg`
      );
      await formatImg(
        formatedImgbPath,
        {
          filename,
          width,
          height
        },
        imgPath
      );
      expect(existsSync(formatedImgbPath)).toBe(true);
    });
    it('should throw an error when filename not found', async () => {
      const filename = 'santamonicaa';
      const width = '500';
      const height = '400';
      const formatedImgbPath = path.join(
        __dirname,
        `../../../../images/thumb/${filename}-${width}x${height}.jpg`
      );
      const imgPath = path.join(
        __dirname,
        `../../../../images/${filename}.jpg`
      );
      await expectAsync(
        formatImg(
          formatedImgbPath,
          {
            filename,
            width,
            height
          },
          imgPath
        )
      ).toBeRejectedWithError();
      expect(existsSync(formatedImgbPath)).toBe(false);
    });
  });
});
