import pool from '@/lib/db';

export const getAddressesForUser = async (userId: number) => {
  const addresses = await pool.query(
    `SELECT
      id,
      place_type as type,
      country,
      postal_code as postalCode,
      city,
      street,
      house_number as houseNumber
    FROM
      user_addresses
    WHERE
      user_id = ?
    `,
    [userId]
  );

  await pool.end();

  return addresses;
};
