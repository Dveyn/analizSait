import pool from "../utils/db";

export const getSait = async (userId: number) => {
  
  const result = await pool.query('SELECT * FROM user_sait WHERE user_id = $1', [userId]);
  return result.rows;
}
