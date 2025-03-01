import { Request, Response } from 'express';
import { Report, IReport } from '../models/Report';
import { WolframService } from '../services/wolfram/client';

export class ReportController {
  private wolframService: WolframService;

  constructor() {
    const wolframAppId = process.env.WOLFRAM_APP_ID;
    if (!wolframAppId) {
      console.error('WOLFRAM_APP_ID environment variable is not set. Please check your .env file.');
    }
    this.wolframService = new WolframService(wolframAppId || '');
  }

  // Create a new report
  createReport = async (req: Request, res: Response) => {
    try {
      const reportData = req.body;
      
      // Analyze report using Wolfram if description is provided
      if (reportData.description) {
        const analysis = await this.wolframService.analyzeIssue(reportData.description);
        if (analysis) {
          reportData.analysis = analysis;
        }
      }

      const report = new Report(reportData);
      await report.save();

      res.status(201).json(report);
    } catch (error) {
      console.error('Error creating report:', error);
      res.status(500).json({ error: 'Failed to create report' });
    }
  };

  // Get all reports with optional filtering
  getReports = async (req: Request, res: Response) => {
    try {
      const { category, status, urgencyLevel } = req.query;
      const filter: any = {};

      if (category) filter.category = category;
      if (status) filter.status = status;
      if (urgencyLevel) filter.urgencyLevel = urgencyLevel;

      const reports = await Report.find(filter)
        .sort({ createdAt: -1 })
        .limit(50);

      res.json(reports);
    } catch (error) {
      console.error('Error fetching reports:', error);
      res.status(500).json({ error: 'Failed to fetch reports' });
    }
  };

  // Get reports near a location
  getNearbyReports = async (req: Request, res: Response) => {
    try {
      const { longitude, latitude, maxDistance = 5000 } = req.query;

      if (!longitude || !latitude) {
        return res.status(400).json({ error: 'Longitude and latitude are required' });
      }

      const reports = await Report.find({
        coordinates: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [Number(longitude), Number(latitude)],
            },
            $maxDistance: Number(maxDistance), // Distance in meters
          },
        },
      }).limit(20);

      res.json(reports);
    } catch (error) {
      console.error('Error fetching nearby reports:', error);
      res.status(500).json({ error: 'Failed to fetch nearby reports' });
    }
  };

  // Update a report
  updateReport = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const report = await Report.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
      );

      if (!report) {
        return res.status(404).json({ error: 'Report not found' });
      }

      res.json(report);
    } catch (error) {
      console.error('Error updating report:', error);
      res.status(500).json({ error: 'Failed to update report' });
    }
  };

  // Delete a report
  deleteReport = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const report = await Report.findByIdAndDelete(id);

      if (!report) {
        return res.status(404).json({ error: 'Report not found' });
      }

      res.json({ message: 'Report deleted successfully' });
    } catch (error) {
      console.error('Error deleting report:', error);
      res.status(500).json({ error: 'Failed to delete report' });
    }
  };
}
