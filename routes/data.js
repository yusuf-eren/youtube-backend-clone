import express from 'express';
import { getDataController } from '../controllers/get-data.js';
const router = express.Router();

// /data-route
router.get('/', getDataController);
router.get('/data', getDataController);
router.post('/', getDataController);

export default router;