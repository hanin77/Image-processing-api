import { isNonValidQuery } from '../../../controllers/utilities';
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
});
