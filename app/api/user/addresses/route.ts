import { NextResponse, NextRequest } from 'next/server';
import { getJWTPayload } from '@/lib/auth';
import pool from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { id } = await getJWTPayload(request);

    const [addresses] = await pool.query(
      'SELECT id, place_type, country, postal_code, city, street, house_number FROM user_addresses WHERE user_id = ?',
      [id]
    );

    return NextResponse.json({ addresses }, { status: 200 });
  } catch (error) {
    return NextResponse.error();
  }
}
