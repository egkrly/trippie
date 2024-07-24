import bcrypt from 'bcryptjs';
import { User } from '@/types';
import * as jose from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export const generateToken = async (user: User) => {
  return await new jose.SignJWT({ id: user.id, username: user.username })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1d')
    .sign(secret);
};

export const verifyToken = async (token: string) => {
  try {
    const { payload } = await jose.jwtVerify(token, secret);
    return payload;
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
};

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const comparePasswords = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};
