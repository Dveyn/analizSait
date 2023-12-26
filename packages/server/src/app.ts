import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import {Signup} from './users/signup'

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

// Разрешаем CORS, пока что со всех адресов и проверяем токены авторизации
app.use(async (req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', 'true');

  // const tokens = getToken(req.headers.cookie);

  // if (tokens) {
  //   const result = await acrualToken(tokens.token, tokens.token2);
  // }

  next();
});



//Ручка авторизации 

// app.post('/api/signin', async (req: Request, res: Response) => {
//   const email = req.body.email;
//   const password = req.body.password;

//   const result = await signin(email, password);
//   res.send(result);
// });

//Ручка регистрации
app.post('/signup', async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
  const passwordSecond = req.body.name;

  const result = await Signup(email, password, passwordSecond);
  res.send(result);
});

// app.get('/api/get', async (req: Request, res: Response) => {
//   const tokens = getToken(req.headers.cookie);

//   if (!tokens) {
//     return res.status(200).json({ isError: true, error: 'Unauthorized' });
//   }
//   const result = await IsAuth(tokens.token, tokens.token2);
//   res.send(result);
// });


app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});


