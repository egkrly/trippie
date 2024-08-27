import pool from '@/lib/db';

export const getAirports = async (term: string) => {
  term = '%' + term + '%';

  const airports = await pool.query(
    `SELECT * FROM airports
      WHERE name like ? OR code like ? OR country_name like ? OR city_name like ?
      ORDER BY search_count, city, num_airports DESC
    `,
    [term, term, term, term]
  );

  return airports;
};
