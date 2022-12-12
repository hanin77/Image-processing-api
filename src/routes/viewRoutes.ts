import express from 'express';
import viewController from '../controllers/viewController';

const viewRoutes = express.Router();
viewRoutes.get('/home', viewController.getHome);
export default viewRoutes;
