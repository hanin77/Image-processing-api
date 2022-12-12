import { Router } from 'express';
import imagesController from '../controllers/imagesController';
const imagesRouter = Router();

imagesRouter.get('/', imagesController.getFormattedImage);

export default imagesRouter;
