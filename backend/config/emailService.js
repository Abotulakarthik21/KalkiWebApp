import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

let transporter;

export const initializeEmail = () => {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  return transporter;
};

export const sendVerificationEmail = async (email, token, userName) => {
  try {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Email Verification - KaliWebApp',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Welcome to KaliWebApp, ${userName}!</h2>
          <p style="color: #666; font-size: 16px;">
            Please verify your email address to complete your registration.
          </p>
          <p style="margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="display: inline-block; padding: 12px 30px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
              Verify Email Address
            </a>
          </p>
          <p style="color: #999; font-size: 12px;">
            Or copy and paste this link in your browser:<br/>
            ${verificationUrl}
          </p>
          <p style="color: #999; font-size: 12px; margin-top: 30px;">
            This link expires in 24 hours.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Verification email sent to ${email}`);
    return true;
  } catch (error) {
    console.error('❌ Error sending email:', error);
    throw error;
  }
};

export const sendResetPasswordEmail = async (email, token, userName) => {
  try {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Password Reset - KaliWebApp',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Password Reset Request</h2>
          <p style="color: #666; font-size: 16px;">
            Hi ${userName}, you requested to reset your password. Click the button below to set a new password.
          </p>
          <p style="margin: 30px 0;">
            <a href="${resetUrl}" 
               style="display: inline-block; padding: 12px 30px; background-color: #28a745; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
              Reset Password
            </a>
          </p>
          <p style="color: #999; font-size: 12px;">
            This link expires in 1 hour. If you didn't request this, please ignore this email.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Password reset email sent to ${email}`);
    return true;
  } catch (error) {
    console.error('❌ Error sending password reset email:', error);
    throw error;
  }
};

export const sendWelcomeEmail = async (email, userName) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Welcome to KaliWebApp!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Welcome, ${userName}!</h2>
          <p style="color: #666; font-size: 16px;">
            Your email has been verified successfully. You can now access all features of KaliWebApp.
          </p>
          <p style="margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL}" 
               style="display: inline-block; padding: 12px 30px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
              Go to Dashboard
            </a>
          </p>
          <p style="color: #999; font-size: 12px; margin-top: 30px;">
            If you have any questions, feel free to contact us.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Welcome email sent to ${email}`);
    return true;
  } catch (error) {
    console.error('❌ Error sending welcome email:', error);
    throw error;
  }
};
