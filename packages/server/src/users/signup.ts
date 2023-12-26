import connection from '../utils/db';
const bcrypt = require('bcrypt');

interface SignupResponse {
  isError: boolean;
  message: string;
}

export const Signup = async (email: string, password: string, passwordSecond:string): Promise<SignupResponse> => {
  try {
    // Хэширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Вставка нового пользователя в базу данных
    const insertUserQuery = 'INSERT INTO Users (email, password_hash) VALUES (?, ?)';
    connection.query(insertUserQuery, [email, hashedPassword], (error: { message: string; }, results: any) => {
      if (error) {
        console.error('Ошибка регистрации пользователя: ' + error.message);
        return { isError: true, message: 'Ошибка сервера' };
      } else {
        console.log('Пользователь успешно зарегистрирован');
        return { isError: false, message: 'Пользователь успешно зарегистрирован' };
      }
    });

    // Обратите внимание, что здесь мы возвращаем Promise, чтобы соответствовать async функции
    return Promise.resolve({ isError: false, message: 'Пользователь успешно зарегистрирован' });
  } catch (error) {
    console.error('Ошибка хэширования пароля: ' + error);
    return { isError: true, message: 'Ошибка сервера' };
  }
};
