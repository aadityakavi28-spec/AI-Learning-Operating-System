import { Router } from 'express';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, (req, res) => {
  res.json({ success: true, data: [] });
});

router.post('/', authenticate, (req, res) => {
  res.json({ success: true, data: {} });
});

router.get('/:id', authenticate, (req, res) => {
  res.json({ success: true, data: {} });
});

router.put('/:id', authenticate, (req, res) => {
  res.json({ success: true, data: {} });
});

router.delete('/:id', authenticate, (req, res) => {
  res.json({ success: true, message: 'Flashcard deleted' });
});

router.post('/:id/review', authenticate, (req, res) => {
  res.json({ success: true, data: {} });
});

export default router;

