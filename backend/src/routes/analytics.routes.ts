import { Router } from 'express';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/learning-stats', authenticate, (req, res) => {
  res.json({ 
    success: true, 
    data: {
      totalStudyTime: 0,
      totalResourcesCompleted: 0,
      totalNotes: 0,
      totalFlashcards: 0,
      averageDailyStudyTime: 0,
      currentStreak: 0,
      longestStreak: 0,
    }
  });
});

router.get('/progress', authenticate, (req, res) => {
  res.json({ success: true, data: [] });
});

router.get('/streak', authenticate, (req, res) => {
  res.json({ success: true, data: { currentStreak: 0, longestStreak: 0 } });
});

router.get('/subject-breakdown', authenticate, (req, res) => {
  res.json({ success: true, data: [] });
});

export default router;

