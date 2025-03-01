import express, { Express, Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import reportRoutes from './routes/reportRoutes';
import userRoutes from './routes/userRoutes';

// Load environment variables
dotenv.config();

const app: Express = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/reports', reportRoutes);
app.use('/api/users', userRoutes);

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Global error handler
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error('Error details:', err);
  
  if (err.name === 'ValidationError') {
    res.status(400).json({ error: err.message });
    return;
  }
  
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: 'Invalid token' });
    return;
  }
  
  res.status(500).json({ error: 'Something went wrong!', message: err.message });
};

app.use(errorHandler);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/react-civic';
const DB_NAME = process.env.DB_NAME || 'REACT';

// Extract the base URI without database name
const baseUri = MONGODB_URI.includes('mongodb+srv://') 
  ? MONGODB_URI.split('?')[0]
  : MONGODB_URI;

// Append database name if not already present
const fullUri = baseUri.endsWith('/') 
  ? `${baseUri}${DB_NAME}?${MONGODB_URI.split('?')[1] || ''}`
  : `${baseUri}/${DB_NAME}?${MONGODB_URI.split('?')[1] || ''}`;

console.log('Connecting to MongoDB...');
// Connect to MongoDB with more detailed logging
mongoose
  .connect(fullUri)
  .then(() => {
    console.log('Successfully connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error details:', error);
    process.exit(1);
  });

export default app;
