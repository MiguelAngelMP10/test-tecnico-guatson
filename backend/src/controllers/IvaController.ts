import {Request, Response} from 'express';

export const ivaCalculation = (req: Request, res: Response) => {
    res.json({'a': 'ivaCalculation'});
};