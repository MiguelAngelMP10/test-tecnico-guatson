import {Request, Response} from 'express';

export const getProfiles = (req: Request, res: Response) => {
    res.json({'a': 'getProfiles'});
};

export const createProfile = (req: Request, res: Response) => {
    res.json({'a': 'createProfile'});
};