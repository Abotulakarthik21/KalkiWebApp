import bcrypt from 'bcryptjs';
import { getDriver } from '../config/database.js';
import { sendResetPasswordEmail, sendVerificationEmail, sendWelcomeEmail } from '../config/emailService.js';
import { generatePasswordResetToken, generateToken, generateVerificationToken, verifyToken } from '../middleware/auth.js';

export const userService = {
  // Register a new user
  async createUser(userData) {
    const { firstName, lastName, email, password } = userData;
    const session = getDriver().session();

    try {
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      const verificationToken = generateVerificationToken();

      const result = await session.run(
        `CREATE (u:User {
          id: randomUUID(),
          firstName: $firstName,
          lastName: $lastName,
          email: $email,
          password: $password,
          verificationToken: $verificationToken,
          isVerified: true,
          createdAt: datetime(),
          updatedAt: datetime()
        })
        RETURN u.id as id, u.email as email, u.firstName as firstName`,
        {
          firstName,
          lastName,
          email: email.toLowerCase(),
          password: hashedPassword,
          verificationToken,
        }
      );

      const user = result.records[0]?.toObject();
      
      // Send verification email (non-blocking - don't fail registration if email fails)
      try {
        await sendVerificationEmail(email, verificationToken, firstName);
      } catch (emailError) {
        console.warn('⚠️ Email not sent (ignored):', emailError.message);
        // Continue anyway - registration succeeds even if email fails
      }

      return {
        id: user.id,
        email: user.email,
        message: 'Registration successful! You can now login.',
      };
    } finally {
      await session.close();
    }
  },

  // Find user by email
  async findUserByEmail(email) {
    const session = getDriver().session();

    try {
      const result = await session.run(
        'MATCH (u:User {email: $email}) RETURN u',
        { email: email.toLowerCase() }
      );

      if (result.records.length === 0) {
        return null;
      }

      const user = result.records[0].get('u').properties;
      return user;
    } finally {
      await session.close();
    }
  },

  // Find user by ID
  async findUserById(userId) {
    const session = getDriver().session();

    try {
      const result = await session.run(
        'MATCH (u:User {id: $userId}) RETURN u',
        { userId }
      );

      if (result.records.length === 0) {
        return null;
      }

      const user = result.records[0].get('u').properties;
      return user;
    } finally {
      await session.close();
    }
  },

  // Verify email
  async verifyEmail(token) {
    const session = getDriver().session();

    try {
      verifyToken(token); // This will throw if token is invalid

      const result = await session.run(
        `MATCH (u:User {verificationToken: $token})
         SET u.isVerified = true,
             u.verificationToken = null,
             u.updatedAt = datetime()
         RETURN u.id as id, u.email as email, u.firstName as firstName`,
        { token }
      );

      if (result.records.length === 0) {
        throw new Error('Invalid verification token or user not found');
      }

      const user = result.records[0].toObject();

      // Send welcome email
      await sendWelcomeEmail(user.email, user.firstName);

      return user;
    } finally {
      await session.close();
    }
  },

  // Login user
  async loginUser(email, password) {
    const user = await this.findUserByEmail(email);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    if (!user.isVerified) {
      throw new Error('Please verify your email first');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const token = generateToken(user.id);

    return {
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    };
  },

  // Request password reset
  async requestPasswordReset(email) {
    const session = getDriver().session();

    try {
      const user = await this.findUserByEmail(email);

      if (!user) {
        // Don't reveal if user exists
        return { message: 'If user exists, password reset link has been sent' };
      }

      const resetToken = generatePasswordResetToken();

      await session.run(
        `MATCH (u:User {email: $email})
         SET u.resetToken = $resetToken,
             u.resetTokenExpiry = datetime() + duration('PT1H'),
             u.updatedAt = datetime()
         RETURN u`,
        {
          email: email.toLowerCase(),
          resetToken,
        }
      );

      // Send password reset email
      await sendResetPasswordEmail(email, resetToken, user.firstName);

      return { message: 'If user exists, password reset link has been sent' };
    } finally {
      await session.close();
    }
  },

  // Reset password
  async resetPassword(token, newPassword) {
    const session = getDriver().session();

    try {
      verifyToken(token); // Validate token

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      const result = await session.run(
        `MATCH (u:User {resetToken: $token})
         WHERE u.resetTokenExpiry > datetime()
         SET u.password = $newPassword,
             u.resetToken = null,
             u.resetTokenExpiry = null,
             u.updatedAt = datetime()
         RETURN u.id as id, u.email as email, u.firstName as firstName`,
        {
          token,
          newPassword: hashedPassword,
        }
      );

      if (result.records.length === 0) {
        throw new Error('Invalid or expired reset token');
      }

      const user = result.records[0].toObject();
      return user;
    } finally {
      await session.close();
    }
  },

  // Update user profile
  async updateUserProfile(userId, updateData) {
    const session = getDriver().session();

    try {
      const { firstName, lastName } = updateData;

      const result = await session.run(
        `MATCH (u:User {id: $userId})
         SET u.firstName = COALESCE($firstName, u.firstName),
             u.lastName = COALESCE($lastName, u.lastName),
             u.updatedAt = datetime()
         RETURN u`,
        {
          userId,
          firstName: firstName || null,
          lastName: lastName || null,
        }
      );

      if (result.records.length === 0) {
        throw new Error('User not found');
      }

      const user = result.records[0].get('u').properties;
      return user;
    } finally {
      await session.close();
    }
  },

  // Get user with relationships (for admin/profile)
  async getUserWithDetails(userId) {
    const session = getDriver().session();

    try {
      const result = await session.run(
        `MATCH (u:User {id: $userId})
         OPTIONAL MATCH (u)-[r]->(related)
         RETURN u, collect({relationship: type(r), node: related}) as relations`,
        { userId }
      );

      if (result.records.length === 0) {
        return null;
      }

      const record = result.records[0];
      const user = record.get('u').properties;

      return user;
    } finally {
      await session.close();
    }
  },
};
