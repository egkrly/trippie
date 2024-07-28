import { NextResponse, NextRequest } from 'next/server';
import { getJWTPayload } from '@/lib/auth';
import { UserAddress } from '@/types';
import { ApiErrors } from '@/utils';
import { getAddressesForUser } from '@/backend/addresses';

export async function GET(request: NextRequest) {
  try {
    const { id } = await getJWTPayload(request);

    if (!id) {
      return ApiErrors[401];
    }

    const result = await getAddressesForUser(id);

    const addresses = result[0] as UserAddress[];

    return NextResponse.json({ addresses }, { status: 200 });
  } catch (error) {
    return NextResponse.error();
  }
}
