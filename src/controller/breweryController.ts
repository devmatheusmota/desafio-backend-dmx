/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { BreweryRequest, GetBrewery } from '../use-cases/GetBrewery';

const getBrewery = new GetBrewery();

class BreweryController {
  async get(req: Request, res: Response): Promise<Response> {
    const queryParams = req.query as any;
    const { query }: BreweryRequest = queryParams;
    try {
      const response = await getBrewery.execute({ query });
      if (!response) {
        return res.status(400).json({ message: 'Something went wrong! Try again.' });
      }
      return res.status(200).json({ message: 'Success', response });
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }
}

export { BreweryController };
