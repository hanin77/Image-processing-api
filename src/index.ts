import express from 'express';
import path from 'path';
import imagesRouter from './routes';
import viewRouter from './routes/viewRoutes';
const app = express();
const port = 5000 || process.env.PORT;
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
const publicPath = path.join(__dirname, '../images');
app.use(express.static(publicPath));
app.use('/', viewRouter);
app.use('/api/images', imagesRouter);
app.listen(port, () => {
  console.log('server runs on port', 5000);
});
export default app;
