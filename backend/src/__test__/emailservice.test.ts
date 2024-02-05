import * as nodemailer from 'nodemailer';
import { sendSignupEmail, sendMessage } from '../services/emailService';

jest.mock('nodemailer');
jest.mock('socket.io');

describe('EmailService', () => {
  describe('sendSignupEmail', () => {
    it('should send a signup email successfully', async () => {
      const mockTransporter = {
        sendMail: jest.fn().mockImplementation((options, callback) => {
          callback(null, { response: 'Email sent successfully' });
        }),
      };

      (nodemailer as any).createTransport.mockReturnValue(mockTransporter);

      const email = 'test@example.com';
      const role = 'user';
      const name = 'John Doe';
      const tempToken = 'tempToken123';

      await expect(sendSignupEmail(email, role, name, tempToken)).resolves.toBeUndefined();

      expect(mockTransporter.sendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          from: expect.any(String),
          to: email,
          subject: expect.any(String),
          html: expect.stringContaining(tempToken),
        }),
        expect.any(Function)
      );
    });

    it('should handle email sending error', async () => {
      const mockTransporter = {
        sendMail: jest.fn().mockImplementation((options, callback) => {
          callback(new Error('Email sending failed'), null);
        }),
      };

      (nodemailer as any).createTransport.mockReturnValue(mockTransporter);

      const email = 'test@example.com';
      const role = 'user';
      const name = 'John Doe';
      const tempToken = 'tempToken123';

      await expect(sendSignupEmail(email, role, name, tempToken)).rejects.toThrowError('Email sending failed');

      expect(mockTransporter.sendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          from: expect.any(String),
          to: email,
          subject: expect.any(String),
          html: expect.stringContaining(tempToken),
        }),
        expect.any(Function)
      );
    });
  });

  describe('sendMessage', () => {

    const mockTo = jest.fn().mockReturnThis();
    const mockEmit = jest.fn();
    const mockIo = {
      to: mockTo,
      emit: mockEmit,
    };

    it('should send a message to a user when userId is provided', () => {
      const userId = '123';
      const message = 'test_message';
      const studentId = 1;

      sendMessage(mockIo as any, userId, message, studentId);

      // Assertions
      expect(mockTo).toHaveBeenCalledWith(userId);
      expect(mockEmit).toHaveBeenCalledWith(message, studentId);
    });

    it('should handle the case when userId is not provided', () => {
      const message = 'test_message';
      const studentId = 1;

      // Mocking console.warn
      const consoleWarnMock = jest.spyOn(console, 'warn').mockImplementation(() => {});

      sendMessage(mockIo as any, null, message, studentId);

      // Assertions
      expect(mockTo).not.toHaveBeenCalled();
      expect(mockEmit).not.toHaveBeenCalled();
      expect(consoleWarnMock).toHaveBeenCalledWith('User not found:', null);

      // Restore the original console.warn after the test
      consoleWarnMock.mockRestore();
    });
  });
});
