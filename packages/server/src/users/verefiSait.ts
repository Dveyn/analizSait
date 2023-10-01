import http from 'http'
import pool from '../utils/db';

export const verefySait = async (id:number) => {

  const result = await pool.query('SELECT * FROM user_sait WHERE id = $1', [id])
  console.log(result, id);
  
  const url = 'http://'+result.rows[0].url+'/audit-boost.txt'; 
  http.get(url, (response) => {
    let data = '';

    // По мере поступления данных, склеиваем их
    response.on('data', (chunk) => {
      data += chunk;
    });

    // Когда все данные получены, обрабатываем их
    response.on('end', () => {
      console.log(data); // Здесь будет содержимое файла
    });

  }).on('error', (err) => {
    console.error(err);
  });

}
