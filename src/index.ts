import express from 'express';
import path from 'path';
import imagesRouter from './routes/imagesRoutes';
import viewRouter from './routes/viewRoutes';
import { AppError } from './controllers/utilities';
import globalErrorController from './controllers/errorController';
const app = express();
const port = 5000 || process.env.PORT;
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
const publicPath = path.join(__dirname, '../images');
app.use(express.static(publicPath));
app.use('/', viewRouter);
app.use('/api/images', imagesRouter);
//last route for all routes that does not exist
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
//error handler  it handles all error
app.use(globalErrorController);
app.listen(port, () => {
  console.log('server runs on port', 5000);
});
export default app;
