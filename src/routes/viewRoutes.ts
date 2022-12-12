import express from 'express';
import viewController from '../controllers/viewController';

const viewRoutes = express.Router();
viewRoutes.get('/', viewController.getHome);
export default viewRoutes;
