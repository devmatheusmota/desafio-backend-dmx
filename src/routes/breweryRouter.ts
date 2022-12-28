/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { BreweryController } from '../controller/breweryController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const breweryController = new BreweryController();

const breweryRouter = Router();

breweryRouter.get('/breweries', ensureAuthenticated, breweryController.get);

export default breweryRouter;
