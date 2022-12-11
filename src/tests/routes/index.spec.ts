import supertest from 'supertest';
import app from '../../index';
describe('GET .../images?query[]', () => {
  const request = supertest(app);
  afterAll(() => {
    //remove all resized images
  });
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
    const res = await request.get(`/api/images?filename=santamonica&width=200`);
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
