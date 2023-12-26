import util from 'util';
import connection from '../utils/db';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken';

const query = util.promisify(connection.query).bind(connection);


export const Signin = async (email: string, password: string) => {
  try {
    const passwordHash = bcrypt.hashSync(password, 10);
    const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
    const existingUser = await query(checkUserQuery, [email]);

    if (existingUser.length < 0) {
      return { isError: true, message: 'Пользователь с таким email не найден' };
    }
    const passwordBD = existingUser[0].password_hash;
    const userId = existingUser[0].id;
    const passwordMatch = bcrypt.compareSync(password, passwordBD);
    console.log(passwordMatch);
    if (!passwordMatch) {
      return { isError: true, message: 'Неверный пароль' };
    }
    //Генерируем токены авторизации
    const token = generateToken(32);
    const token2 = generateToken(32);
    const last_time = new Date();
    const insertUserQuery = 'INSERT INTO user_tokens (user_id, token, token2, last_time) VALUES (?, ?, ?, ?)';
    await query(insertUserQuery, [userId, token, token2, last_time]);

    return { isError: false, token, token2 }
    
  } catch (error) {
    console.log('Ошибка авторизации: ', error);
    return { isError: true, message: 'Ошибка сервера' }
  }
}
