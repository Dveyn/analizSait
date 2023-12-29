import util from 'util';
import connection from '../utils/db';

const query = util.promisify(connection.query).bind(connection);

export const checkTokenValidity = async (
  token: string,
  token2: string
)=> {
  try {
    const getUserTokensQuery = 'SELECT * FROM user_tokens WHERE token = ? AND token2 = ?';
    const userTokens = await query(getUserTokensQuery, [token, token2]);

    if (userTokens.length === 0) {
      return { isValid: false, message: 'Неверные токены' };
    }



    const lastTime = userTokens[0].last_time as Date;
    const currentTime = new Date();
    const tokenValidityDuration = 7 * 24 * 60 * 60 * 1000; // Допустим, токены считаются действительными 24 часа

    if (currentTime.getTime() - lastTime.getTime() > tokenValidityDuration) {
      return { isValid: false, message: 'Токены устарели'};
    }

    const getUserInfoQuery = 'SELECT id, email FROM users WHERE id = ?';
    const getUserInfo = await query(getUserInfoQuery, [userTokens[0].user_id]);

    return { isValid: true, message: 'OK', user: getUserInfo[0] };
  } catch (error) {
    console.log('Ошибка при проверке токенов: ', error);
    return { isValid: false, message: 'Ошибка сервера' };
  }
};
 