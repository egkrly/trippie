import bcrypt from 'bcryptjs';
import { User } from '@/types';
import * as jose from 'jose';
import { NextRequest } from 'next/server';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export const generateToken = async (user: User) => {
  return await new jose.SignJWT({ id: user.id, username: user.username })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1d')
    .sign(secret);
};

export const verifyToken = async <T = unknown>(token: string): Promise<T> => {
  try {
    const { payload } = await jose.jwtVerify<T>(token, secret);
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

export const getJWTPayload = async (
  request: NextRequest
): Promise<{ id: number; username: string }> => {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return null;
  }

  return await verifyToken(token);
};
