import express from 'express';
// @ts-ignore
import {getProfiles, createProfile} from "./controllers/ProfileController";
import {uploadZip} from "./controllers/InvoicesController";
import {ivaCalculation} from "./controllers/IvaController"

const router = express.Router();

router.get('/perfiles', getProfiles);
router.post('/perfiles', createProfile);
router.post('/facturas', uploadZip);
router.get('/iva-calculo', ivaCalculation);

export default router;
