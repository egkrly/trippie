import { NextResponse, NextRequest } from 'next/server';
import { getJWTPayload } from '@/lib/auth';
import { Airport } from '@/types';
import { ApiErrors } from '@/utils';
import { getAirports } from '@/backend/airports';

export async function GET(request: NextRequest) {
  try {
    const { id } = await getJWTPayload(request);

    if (!id) {
      return ApiErrors[401];
    }

    const term = request.nextUrl.searchParams.get('term');

    if (!term) {
      return NextResponse.error();
    }

    const result = await getAirports(term);
    const airports = result[0] as Airport[];

    return NextResponse.json({ airports }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
