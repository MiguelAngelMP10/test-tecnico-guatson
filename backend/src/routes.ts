import express from 'express';
import multer from 'multer';


const storage = multer.memoryStorage();
const upload = multer({storage});
// @ts-ignore
import {getProfiles, createProfile} from "./controllers/ProfileController";
import {uploadZip, getInvoices} from "./controllers/InvoicesController";
import {ivaCalculation} from "./controllers/IvaController"

const router = express.Router();

router.get('/perfiles', getProfiles);
router.post('/perfiles', createProfile);
router.get('/facturas', getInvoices);
router.post('/facturas', upload.single('zipFile'), uploadZip);
router.get('/iva-calculo', ivaCalculation);

export default router;
