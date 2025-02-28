import mongoose, { Document, Schema } from 'mongoose';

export interface IReport extends Document {
  title: string;
  description: string;
  category: string;
  location: string;
  coordinates: {
    type: string;
    coordinates: [number, number];
  };
  status: 'pending' | 'investigating' | 'resolved' | 'closed';
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical';
  anonymous: boolean;
  userId?: mongoose.Types.ObjectId;
  images?: string[];
  analysis?: {
    wolframResult?: string;
    classification?: string;
    confidence?: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const reportSchema = new Schema<IReport>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    index: true,
  },
  location: {
    type: String,
    required: true,
  },
  coordinates: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  status: {
    type: String,
    enum: ['pending', 'investigating', 'resolved', 'closed'],
    default: 'pending',
    index: true,
  },
  urgencyLevel: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium',
    index: true,
  },
  anonymous: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
  },
  images: [{
    type: String,
  }],
  analysis: {
    wolframResult: String,
    classification: String,
    confidence: Number,
  },
}, {
  timestamps: true,
});

// Create a 2dsphere index for geospatial queries
reportSchema.index({ coordinates: '2dsphere' });

export const Report = mongoose.model<IReport>('Report', reportSchema);
