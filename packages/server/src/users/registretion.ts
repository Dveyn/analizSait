import pool from '../utils/db';
import bcrypt from 'bcryptjs';

export const registration = async (email:string , password: string, username:string) => {

  const oneUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  if (oneUser.rowCount > 0) {
   return {is_error: true, message: 'Пользователь с таким email уже зарегистрирован'};
  }

  const query = `INSERT INTO users (email, password, username) VALUES ($1, $2, $3)`;
  const passwordHash = bcrypt.hashSync('bacon', 8);
  const values = [email, passwordHash, username];
  const result = await pool.query(query, values);
  return {is_error: false, message: 'Пользователь успешно зарегистрирован'};
  
}
