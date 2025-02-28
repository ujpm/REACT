import express from 'express';
import { ReportController } from '../controllers/reportController';

const router = express.Router();
const reportController = new ReportController();

// Report routes
router.post('/', reportController.createReport);
router.get('/', reportController.getReports);
router.get('/nearby', reportController.getNearbyReports);
router.put('/:id', reportController.updateReport);
router.delete('/:id', reportController.deleteReport);

export default router;
