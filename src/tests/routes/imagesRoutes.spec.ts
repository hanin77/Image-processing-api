import supertest from 'supertest';
import path from 'path';
import app from '../../index';
import { promises as fs } from 'fs';
describe('app Endpoints', () => {
  const request = supertest(app);
  afterAll(async () => {
    //remove all resized images folder thumb
    const thumbPath = path.join(__dirname, `../../../images/thumb`);
    for (const file of await fs.readdir(thumbPath)) {
      await fs.unlink(path.join(thumbPath, file));
    }
  });
  describe('GET .../api/images?query[]', () => {
    it('should respond with 400 status if  filename query param is missing', async () => {
      const res = await request.get(`/api/images?width=200&height=200`);
      expect(res.type).toBe('application/json');
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('not all required fields where provided');
    });
    it('should respond with 400 status if width query param is missing', async () => {
      const res = await request.get(
        `/api/images?filename=santamonica&height=200`
      );
      expect(res.type).toBe('application/json');
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('not all required fields where provided');
    });
    it('should respond with 400 status if height query param is missing', async () => {
      const res = await request.get(
        `/api/images?filename=santamonica&width=200`
      );
      expect(res.type).toBe('application/json');
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('not all required fields where provided');
    });
    it('should respond with 404 status if the requested image not found', async () => {
      const res = await request.get(
        `/api/images?filename=missingimg&width=200&height=200`
      );
      expect(res.type).toBe('application/json');
      expect(res.status).toBe(404);
      expect(res.body.message).toBe(
        'the requested image to format was not found'
      );
    });
    it('should respond with requested resized image when present on server', async () => {
      const width = 300;
      const height = 200;
      const res = await request.get(
        `/api/images?filename=santamonica&width=${width}&height=${height}`
      );
      expect(res.status).toBe(200);
      expect(res.type).toBe('image/jpeg');
    });
  });
  describe('GET ../', async () => {
    it('sould responde 200 status', async () => {
      const res = await request.get(`/`);
      expect(res.status).toBe(200);
      expect(res.type).toBe('text/html');
      expect(res.text).toContain(`Can't find / on this server!`);
    });
  });
  describe('GET ../home', async () => {
    it('sould responde 200 status', async () => {
      const res = await request.get(`/home`);
      expect(res.status).toBe(200);
      expect(res.type).toBe('text/html');
      expect(res.text).toContain(`Image Processing API`);
      expect(res.text).toContain(`Available images`);
    });
  });
});
