import util from 'util';
import connection from '../utils/db';
import bcrypt from 'bcryptjs';

const query = util.promisify(connection.query).bind(connection);

interface SignupResponse {
  isError: boolean;
  message: string;
}

export const Signup = async (email: string, password: string, passwordSecond: string): Promise<SignupResponse> => {
  try {
    const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
    const existingUser = await query(checkUserQuery, [email]);

    if (existingUser.length > 0) {
      return { isError: true, message: 'Пользователь с таким email уже существует' };
    }

    // Хэширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Вставка нового пользователя в базу данных
    const insertUserQuery = 'INSERT INTO users (email, password_hash) VALUES (?, ?)';
    await query(insertUserQuery, [email, hashedPassword]);

    console.log('Пользователь успешно зарегистрирован');
    return { isError: false, message: 'Пользователь успешно зарегистрирован' };
  } catch (error) {
    console.error('Ошибка регистрации пользователя: ' + error);
    return { isError: true, message: 'Ошибка сервера' };
  }
};
