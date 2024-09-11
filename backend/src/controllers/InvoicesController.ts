import {Request, Response} from 'express';

export const uploadZip = (req: Request, res: Response) => {
    res.json({'a': 'uploadZip'});
};