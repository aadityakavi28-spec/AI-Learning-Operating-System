import { Router, Response } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';
import { searchResources, getResourceById, saveResource, getSavedResources } from '../controllers/resource.controller';

const router = Router();

// GET /api/resources/search - Search resources
router.get('/search', authenticate, searchResources);

// GET /api/resources/:id - Get resource by ID
router.get('/:id', authenticate, getResourceById);

// POST /api/resources/save - Save resource
router.post('/save', authenticate, saveResource);

// GET /api/resources/saved/all - Get saved resources
router.get('/saved/all', authenticate, getSavedResources);

export default router;

