import pool from '../utils/db';

export const acrualToken = async (token: string, token2: string) => {

  const result = await pool.query("SELECT * FROM user_token WHERE token = 1$ AND token2 = $2", [token, token2]);
  if (result.rows[0].is_active) {
    const currentDate = new Date().toISOString().split('T')[0];
    const savedDateObj = new Date(result.rows[0].date_active);
    const currentDateObj = new Date(currentDate);

    const timeDiff = Math.abs(currentDateObj.getTime() - savedDateObj.getTime());
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    const weeksDiff = Math.floor(daysDiff / 7);

    if (weeksDiff >= 1) {
      return { isError: true, message: "Время авторизации истекло" }
    } else {
      const updateResult = await pool.query('UPDATE user_token SET date_active = $1 WHERE id=$2', [currentDate, result.rows[0].id]);
    }


  }
  return { isError: true, message: "Время авторизации истекло" }

}
