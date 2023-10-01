import pool from "../utils/db";
import { valodation } from "../utils/validation";
import bcrypt from 'bcryptjs';


export const AddSait = async (url: string) => {
  if (!url) return { isError: true, message: "Не указан URL" };
  if (!valodation.url(url)) {
    return { isError: true, message: "Неверный формат URL" };
  }

  const secretKey = bcrypt.hashSync(url, 8)
  const result = await pool.query(`INSERT INTO user_sait (url, secret_key) VALUES ($1, $2)`, [url, secretKey]);
  return { isError: false, message: "Сайт успешно добавлен", key: secretKey };
}
 