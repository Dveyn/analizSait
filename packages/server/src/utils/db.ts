const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'ваш_хост',
  user: 'ваш_пользователь',
  password: 'ваш_пароль',
  database: 'ваша_база_данных',
});

export default connection;
