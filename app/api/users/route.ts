import db from '@/lib/db';

export async function GET() {
  try {
    const [users] = await db.query('select * from users');

    return Response.json({ users }, { status: 200 });
  } catch (error) {
    return Response.json({ error: error?.message }, { status: 500 });
  }
}
