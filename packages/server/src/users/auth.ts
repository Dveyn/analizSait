import pool from '../utils/db';
import { generateToken } from '../utils/generateToken';
import bcrypt from 'bcryptjs';

export const signin = async (email: string, password:string) => {
  
  try {
    const passwordHash = bcrypt.hashSync(password, 8);
    console.log(passwordHash);
    
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return { isError: true, message: 'Пользователь не найден' };
    }
    const passwordBD = user.rows[0].password;
    console.log(passwordHash, passwordBD);
    const passwordMatch = bcrypt.compareSync(password, passwordBD);
    console.log(passwordMatch);
    if (!passwordMatch) {
      return { isError: true, message: 'Неверный пароль' };
    }


    // Генерация токена и отправка на клиент
    const token = generateToken(user.rows[0].id + 15);
    const token2= generateToken(user.rows[0].id + 15);
    const currentDate = new Date().toISOString().split('T')[0];

    console.log(user.rows[0].id)

    const setToken = await pool.query('INSERT INTO user_token (user_id, date_active, token, token2) VALUES ($1, $2, $3, $4)', [user.rows[0].id, currentDate, token, token2]);

    return { isError: false, token, token2 };
  } catch (error) {
    console.error('Ошибка при авторизации', error);
    return { isError:true, message: 'Ошибка сервера' };
  }
}

