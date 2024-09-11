import express from 'express';
import multer from 'multer';
import unzipper from 'unzipper';
import {PassThrough} from 'stream';

const storage = multer.memoryStorage();
const upload = multer({storage});
// @ts-ignore
import {getProfiles, createProfile} from "./controllers/ProfileController";
import {uploadZip} from "./controllers/InvoicesController";
import {ivaCalculation} from "./controllers/IvaController"

const router = express.Router();

router.get('/perfiles', getProfiles);
router.post('/perfiles', createProfile);
router.post('/facturas', upload.single('zipFile'), uploadZip);
router.get('/iva-calculo', ivaCalculation);

export default router;
