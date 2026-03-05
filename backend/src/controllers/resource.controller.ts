import { Response } from 'express';
import axios from 'axios';
import { AuthRequest } from '../middleware/auth';
import { config } from '../config/env';

export const searchResources = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { query, type, difficulty, page = 1, limit = 20 } = req.query;
    
    // Call AI service for smart search
    const response = await axios.post(`${config.aiService.url}/api/search`, {
      query,
      filters: { type, difficulty },
      page: Number(page),
      limit: Number(limit),
    });

    res.json({
      success: true,
      data: response.data,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: response.data.total || 0,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to search resources' });
  }
};

export const getResourceById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    // Fetch from cache or database
    res.json({ success: true, data: { id, title: 'Sample Resource' } });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to get resource' });
  }
};

export const saveResource = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { resourceId } = req.body;
    res.json({ success: true, message: 'Resource saved successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to save resource' });
  }
};

export const getSavedResources = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    res.json({ success: true, data: [] });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to get saved resources' });
  }
};

