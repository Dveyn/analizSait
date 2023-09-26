import crypto from 'crypto';

export function generateToken(length: number): string {
  return crypto.randomBytes(length).toString('hex');
}


