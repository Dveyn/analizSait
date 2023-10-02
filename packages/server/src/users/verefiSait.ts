import http from 'http'
import pool from '../utils/db';
import axios from 'axios';

export const verefySait = async (id:number) => {

  const result = await pool.query('SELECT * FROM user_sait WHERE id = $1', [id])
  const url = result.rows[0].url
  
  const protocols = ['https', 'http'];

  for (const protocol of protocols) {
    try {
      const response = await axios.get(`${protocol}://${url}/audit-boost.txt`);

      if (result.rows[0].secret_key === response.data) {
        await pool.query('UPDATE user_sait SET is_verefy = true WHERE id=$1', [id])
       return {isError: false, message: 'Сайт подтвержден'}
      } 
      
      return;
    } catch (error) {
      console.error(`Ошибка при запросе по протоколу ${protocol}: ${error}`);
    }
  }



}



