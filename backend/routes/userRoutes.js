import express from 'express';
import { getDriver } from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get user profile
router.get('/profile', authenticateToken, async (req, res) => {
  const session = getDriver().session();

  try {
    const result = await session.run(
      `MATCH (u:User {id: $userId})
       RETURN u`,
      { userId: req.userId }
    );

    if (result.records.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = result.records[0].get('u').properties;

    res.status(200).json({
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Failed to fetch profile' });
  } finally {
    await session.close();
  }
});

// Get all members (public endpoint)
router.get('/members', async (req, res) => {
  const session = getDriver().session();

  try {
    const result = await session.run(
      `MATCH (u:User) 
       RETURN u.id as id, u.firstName as firstName, u.lastName as lastName, u.email as email, u.isVerified as isVerified
       ORDER BY u.createdAt DESC`
    );

    const members = result.records.map(record => record.toObject());

    res.status(200).json({
      count: members.length,
      members,
    });
  } catch (error) {
    console.error('Error fetching members:', error);
    res.status(500).json({ message: 'Failed to fetch members' });
  } finally {
    await session.close();
  }
});

export default router;
