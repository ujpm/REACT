import api from './config';

export interface Location {
  type: 'Point';
  coordinates: [number, number];
}

export interface Report {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  coordinates: Location;
  status: 'pending' | 'in_progress' | 'resolved';
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical';
  analysis?: {
    classification: string;
    confidence: number;
    recommendations: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateReportData {
  title: string;
  description: string;
  category: string;
  location: string;
  coordinates: [number, number];
}

class ReportService {
  async createReport(data: CreateReportData): Promise<Report> {
    const response = await api.post<Report>('/reports', {
      ...data,
      coordinates: {
        type: 'Point',
        coordinates: data.coordinates,
      },
    });
    return response.data;
  }

  async getReports(params?: {
    category?: string;
    status?: string;
    urgencyLevel?: string;
  }): Promise<Report[]> {
    const response = await api.get<Report[]>('/reports', { params });
    return response.data;
  }

  async getNearbyReports(
    latitude: number,
    longitude: number,
    maxDistance: number = 5000
  ): Promise<Report[]> {
    const response = await api.get<Report[]>('/reports/nearby', {
      params: { latitude, longitude, maxDistance },
    });
    return response.data;
  }

  async updateReport(id: string, data: Partial<Report>): Promise<Report> {
    const response = await api.put<Report>(`/reports/${id}`, data);
    return response.data;
  }

  async deleteReport(id: string): Promise<void> {
    await api.delete(`/reports/${id}`);
  }
}

export default new ReportService();
