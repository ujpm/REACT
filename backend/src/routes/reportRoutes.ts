import express, { Request, Response } from 'express';
import { ReportController } from '../controllers/reportController';

const router = express.Router();
const reportController = new ReportController();

// Report routes
router.post('/', reportController.createReport);
router.get('/', reportController.getReports);
router.get('/nearby', async (req: Request, res: Response) => {
  await reportController.getNearbyReports(req, res);
});
router.put('/:id', async (req: Request, res: Response) => {
  await reportController.updateReport(req, res);
});
router.delete('/:id', async (req: Request, res: Response) => {
  await reportController.deleteReport(req, res);
});

export default router;
