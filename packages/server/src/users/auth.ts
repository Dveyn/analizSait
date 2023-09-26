import pool from '../utils/db';
import { generateToken } from '../utils/generateToken';

export const signup = async (email: string, password:string) => {
  
  try {
    const user = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);

    if (user.rows.length === 0) {
      return { message: 'Неверные учетные данные' };
    }

    // Генерация токена и отправка на клиент
    const token = generateToken(user.rows[0].id);
    return{ token }
  } catch (error) {
    console.error('Ошибка при авторизации', error);
    return { message: 'Ошибка сервера' };
  }
}

