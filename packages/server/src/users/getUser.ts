import pool from "../utils/db";

type getUserProps = {
  token: string,
  token2: string
}
export const getUser = async (tokens:getUserProps) => {
  const token = tokens.token;
  const token2 = tokens.token2;
  
  const result = await pool.query("SELECT * FROM user_token WHERE token = $1 AND token2 = $2", [token, token2]);
  const userQuery = await pool.query("SELECT * FROM users WHERE id = $1", [result.rows[0].user_id]);
  
  if (userQuery.rowCount && userQuery.rows[0]) {
    return userQuery.rows[0]
  }
};
