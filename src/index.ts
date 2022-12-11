import express from 'express';
import imagesRouter from './routes';
const app = express();
app.use('/api/images', imagesRouter);
app.listen(5000, () => {
  console.log('server runs on port', 5000);
});
