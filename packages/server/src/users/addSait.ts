import pool from "../utils/db";
import { valodation } from "../utils/validation";
import bcrypt from 'bcryptjs';


export const AddSait = async (url: string, id:number) => {
  if (!url) return { isError: true, message: "Не указан URL" };
  if (!valodation.url(url)) {
    return { isError: true, message: "Неверный формат URL" };
  }

  const secretKey = bcrypt.hashSync(url, 8)
  const result = await pool.query(`INSERT INTO user_sait (url, secret_key, user_id) VALUES ($1, $2, $3)`, [url, secretKey, id ]);
  return { isError: false, message: "Сайт успешно добавлен", key: secretKey };
}
 