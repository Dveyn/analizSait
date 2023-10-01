import pool from '../utils/db';


export const IsAuth = async (token: string, token2: string) => {


  const result = await pool.query("SELECT * FROM user_token WHERE token = $1 AND token2 = $2", [token, token2]);
  
  if (result.rowCount && result.rows[0].is_active) {
    const currentDate = new Date().toISOString().split('T')[0];
    const savedDateObj = new Date(result.rows[0].date_active);
    const currentDateObj = new Date(currentDate);

    const timeDiff = Math.abs(currentDateObj.getTime() - savedDateObj.getTime());
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    const weeksDiff = Math.floor(daysDiff / 7);

    if (weeksDiff >= 1) {
      await pool.query("UPDATE user_token SET is_active = false WHERE id= $1", [result.rows[0].id]);
      return { isError: true, message: "Время авторизации истекло" }
    } else {
      return { isError: false }
    }

  }

  return { isError: false, message: "Время авторизации истекло" }

};

