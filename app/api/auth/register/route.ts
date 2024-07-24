import { NextResponse, NextRequest } from 'next/server';
import pool from '@/lib/db';
import { hashPassword, generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { username, password, email } = await request.json();
    const hashedPassword = await hashPassword(password);

    const [result] = await pool.query(
      'INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
      [username, hashedPassword, email]
    );

    const user = { id: result.insertId, username };
    const token = await generateToken(user);

    return NextResponse.json({ user, token }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}
