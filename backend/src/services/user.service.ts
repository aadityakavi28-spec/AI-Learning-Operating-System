import { query } from '../config/database';
import { logger } from '../utils/logger';

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar?: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserData {
  email: string;
  password: string;
  name: string;
  role: string;
  avatar?: string;
  bio?: string;
}

export const findUserById = async (id: string): Promise<User | null> => {
  try {
    const result = await query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0] || null;
  } catch (error) {
    logger.error('Error finding user by id:', error);
    throw error;
  }
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const result = await query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0] || null;
  } catch (error) {
    logger.error('Error finding user by email:', error);
    throw error;
  }
};

export const createUser = async (data: CreateUserData): Promise<User> => {
  try {
    const result = await query(
      `INSERT INTO users (email, password, name, role, avatar, bio)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [data.email, data.password, data.name, data.role, data.avatar || null, data.bio || null]
    );
    return result.rows[0];
  } catch (error) {
    logger.error('Error creating user:', error);
    throw error;
  }
};

export const updateUser = async (id: string, data: Partial<CreateUserData>): Promise<User> => {
  try {
    const updates: string[] = [];
    const values: unknown[] = [];
    let paramIndex = 1;

    if (data.name) {
      updates.push(`name = $${paramIndex++}`);
      values.push(data.name);
    }
    if (data.avatar) {
      updates.push(`avatar = $${paramIndex++}`);
      values.push(data.avatar);
    }
    if (data.bio) {
      updates.push(`bio = $${paramIndex++}`);
      values.push(data.bio);
    }

    if (updates.length === 0) {
      return findUserById(id) as Promise<User>;
    }

    updates.push(`updatedAt = NOW()`);
    values.push(id);

    const result = await query(
      `UPDATE users SET ${updates.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
      values
    );
    return result.rows[0];
  } catch (error) {
    logger.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async (id: string): Promise<void> => {
  try {
    await query('DELETE FROM users WHERE id = $1', [id]);
  } catch (error) {
    logger.error('Error deleting user:', error);
    throw error;
  }
};

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const result = await query('SELECT * FROM users ORDER BY createdAt DESC');
    return result.rows;
  } catch (error) {
    logger.error('Error getting all users:', error);
    throw error;
  }
};

