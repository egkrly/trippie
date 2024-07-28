import { NextResponse } from 'next/server';

export const ApiErrors = {
  401: NextResponse.json({ message: 'Auth required' }, { status: 401 }),
};
