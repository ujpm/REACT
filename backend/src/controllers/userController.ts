import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/User';

export class UserController {
  // Register new user
  register = async (req: Request, res: Response) => {
    try {
      const { email, password, name } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already registered' });
      }

      // Create new user
      const user = new User({
        email,
        password,
        name,
      });

      await user.save();

      // Generate token
      const token = this.generateToken(user);

      res.status(201).json({
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        token,
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Error registering user' });
    }
  };

  // Login user
  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Check password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generate token
      const token = this.generateToken(user);

      res.json({
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        token,
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Error logging in' });
    }
  };

  // Get user profile
  getProfile = async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.user?._id).select('-password');
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({ error: 'Error fetching profile' });
    }
  };

  // Update user profile
  updateProfile = async (req: Request, res: Response) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({ error: 'Invalid updates' });
    }

    try {
      const user = await User.findById(req.user?._id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      updates.forEach((update) => {
        user[update as keyof IUser] = req.body[update];
      });

      await user.save();
      res.json({
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      });
    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({ error: 'Error updating profile' });
    }
  };

  private generateToken(user: IUser): string {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    });
  }
}
