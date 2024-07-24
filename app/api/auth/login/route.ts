import { NextResponse, NextRequest } from 'next/server';
import pool from '@/lib/db';
import { comparePasswords, generateToken, hashPassword } from '@/lib/auth';
import { User } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    const result = await pool.query('SELECT * FROM users WHERE username = ? LIMIT 1', [username]);
    const user = result[0][0] as User;

    if (!user || !(await comparePasswords(password, user.password))) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = await generateToken(user);

    return NextResponse.json({ user: { id: user.id, username: user.username }, token });
  } catch (error) {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
