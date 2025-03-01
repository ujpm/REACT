import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

interface AuthRequest extends Request {
  user?: any; // We'll improve this type later
}

export class UserController {
  async register(req: Request, res: Response) {
    try {
      const { email, password, name } = req.body;

      // Validate required fields
      if (!email || !password || !name) {
        return res.status(400).json({ 
          message: 'Missing required fields',
          required: ['email', 'password', 'name'],
          received: Object.keys(req.body)
        });
      }

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Create new user
      const user = new User({
        email,
        password,
        name,
        role: 'user'
      });

      await user.save();

      // Create JWT token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || 'default_secret',
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' } as jwt.SignOptions
      );

      res.status(201).json({
        message: 'User registered successfully',
        user: { id: user._id, email: user.email, name: user.name },
        token,
      });
    } catch (error: any) {
      console.error('Registration error:', error);
      res.status(500).json({ 
        message: 'Error registering user',
        error: error.message 
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Validate required fields
      if (!email || !password) {
        return res.status(400).json({ 
          message: 'Missing required fields',
          required: ['email', 'password'],
          received: Object.keys(req.body)
        });
      }

      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Verify password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Create JWT token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || 'default_secret',
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' } as jwt.SignOptions
      );

      res.json({
        user: { id: user._id, email: user.email, name: user.name },
        token,
      });
    } catch (error: any) {
      console.error('Login error:', error);
      res.status(500).json({ 
        message: 'Error logging in',
        error: error.message 
      });
    }
  }

  async getProfile(req: AuthRequest, res: Response) {
    try {
      if (!req.user?.userId) {
        return res.status(401).json({ message: 'Not authorized' });
      }

      const user = await User.findById(req.user.userId).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(user);
    } catch (error: any) {
      console.error('Get profile error:', error);
      res.status(500).json({ 
        message: 'Error fetching profile',
        error: error.message 
      });
    }
  }

  async updateProfile(req: AuthRequest, res: Response) {
    try {
      if (!req.user?.userId) {
        return res.status(401).json({ message: 'Not authorized' });
      }

      const user = await User.findById(req.user.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Update only allowed fields
      const allowedUpdates = ['name', 'email'];
      const updates = Object.keys(req.body)
        .filter(key => allowedUpdates.includes(key))
        .reduce((obj: any, key) => {
          obj[key] = req.body[key];
          return obj;
        }, {});

      Object.assign(user, updates);
      await user.save();

      res.json({ 
        user: { 
          id: user._id, 
          email: user.email, 
          name: user.name 
        } 
      });
    } catch (error: any) {
      console.error('Update profile error:', error);
      res.status(500).json({ 
        message: 'Error updating profile',
        error: error.message 
      });
    }
  }
}
