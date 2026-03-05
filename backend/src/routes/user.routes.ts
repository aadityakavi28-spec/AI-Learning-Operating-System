import { Router, Response } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';
import { getProfile, updateProfile, deleteUserAccount } from '../controllers/user.controller';

const router = Router();

// GET /api/users/profile - Get user profile
router.get('/profile', authenticate, getProfile);

// PUT /api/users/profile - Update user profile
router.put('/profile', authenticate, updateProfile);

// DELETE /api/users/account - Delete user account
router.delete('/account', authenticate, deleteUserAccount);

export default router;

