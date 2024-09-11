import {Request, Response} from 'express';
import {FiscalProfile} from '../models/FiscalProfile';

export const getProfiles = async (req: Request, res: Response) => {
    try {
        const fiscalProfiles = await FiscalProfile.findAll();
        res.json(fiscalProfiles);
    } catch (error) {
        res.status(500).json({message: 'Error al obtener FiscalProfiles', error});
    }
};

export const createProfile = async (req: Request, res: Response) => {
    try {
        const fiscalProfile = await FiscalProfile.create(req.body);
        res.status(201).json(fiscalProfile);
    } catch (error) {
        res.status(500).json({message: 'Error al crear FiscalProfile', error});
    }
};