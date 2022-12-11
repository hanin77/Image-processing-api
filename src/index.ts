import express from 'express';
import imagesRouter from './routes';
const app = express();
const port = 5000 || process.env.PORT;
app.use('/api/images', imagesRouter);
app.listen(port, () => {
  console.log('server runs on port', 5000);
});
export default app;
