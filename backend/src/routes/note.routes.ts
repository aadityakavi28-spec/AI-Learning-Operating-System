import { Router } from 'express';
import { authenticate } from '../middleware/auth';

const router = Router();

// GET /api/notes - Get all notes
router.get('/', authenticate, (req, res) => {
  res.json({ success: true, data: [] });
});

// POST /api/notes - Create note
router.post('/', authenticate, (req, res) => {
  res.json({ success: true, data: {} });
});

// GET /api/notes/:id - Get note by ID
router.get('/:id', authenticate, (req, res) => {
  res.json({ success: true, data: {} });
});

// PUT /api/notes/:id - Update note
router.put('/:id', authenticate, (req, res) => {
  res.json({ success: true, data: {} });
});

// DELETE /api/notes/:id - Delete note
router.delete('/:id', authenticate, (req, res) => {
  res.json({ success: true, message: 'Note deleted' });
});

export default router;

