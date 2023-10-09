import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { trainModel } from './model/trainModel'; // Импортируем функцию для обучения модели 
import { decodePredictions, predict } from './model/predict';
import { signin } from './users/auth';
import { signup } from './users/registretion';
import { acrualToken } from './users/actualToken';
import { IsAuth } from './users/is-auth';
import { getToken } from './utils/getCookies';
import { AddSait } from './users/addSait';
import { getUser } from './users/getUser';
import { getSait } from './users/getSait';
import { verefySait } from './users/verefiSait';
import { getDataSait } from './sait/getDataSait';
import { demonAnalyz } from './sait/demonAnalyz';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

// Разрешаем CORS, пока что со всех адресов и проверяем токены авторизации
app.use(async (req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', 'true');

  const tokens = getToken(req.headers.cookie);

  if (tokens) {
    const result = await acrualToken(tokens.token, tokens.token2);
  }

  next();
});


// Ручка для принятия данных и запуска обучения модели
app.post('/train', async (req: Request, res: Response) => {

  const tokens = getToken(req.headers.cookie);
  if (!tokens) {
    return res.status(200).json({ isError: true, error: 'Unauthorized' });
  }

  const inputData = req.body.data; // Данные для обучения (тексты статей)
  const inputLabels = req.body.labels; // Метки классов
  const history = await trainModel(inputData, inputLabels);
  res.send(history);
});

app.post('/api/predict', async (req: Request, res: Response) => {

  const tokens = getToken(req.headers.cookie);
  if (!tokens) {
    return res.status(200).json({ isError: true, error: 'Unauthorized' });
  }

  const inputData = req.body.data; // Данные для обучения (тексты статей)

  const resuls = await predict(inputData);
  if (!resuls) return res.send("Не удалось прогнозировать данные");
  const decodedPredictions = await decodePredictions(resuls);
  res.send(decodedPredictions);
});

//Ручка авторизации 

app.post('/api/signin', async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;

  const result = await signin(email, password);
  res.send(result);
});

//Ручка регистрации
app.post('/api/signup', async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.name;

  const result = await signup(email, password, username);
  res.send(result);
});
app.get('/api/get', async (req: Request, res: Response) => {
  const tokens = getToken(req.headers.cookie);

  if (!tokens) {
    return res.status(200).json({ isError: true, error: 'Unauthorized' });
  }
  const result = await IsAuth(tokens.token, tokens.token2);
  res.send(result);
});

app.post('/api/addSait', async (req, res) => {
  const tokens = getToken(req.headers.cookie);
  if (!tokens) {
    return res.status(200).json({ isError: true, error: 'Unauthorized' });
  }
  const user = await getUser(tokens);
  const url = req.body.url;
  const result = await AddSait(url, user.id);
  res.send(result);

});

app.get('/api/getSait', async (req: Request, res: Response) => {
  const tokens = getToken(req.headers.cookie);
  if (!tokens) {
    return res.status(200).json({ isError: true, error: 'Unauthorized' });
  }
  const userInfo = await getUser(tokens)
  const result = await getSait(userInfo.id);
  res.send(result);
});


app.post('/api/sendVerefySait', async (req: Request, res: Response) => {
  const tokens = getToken(req.headers.cookie);
  if (!tokens) {
    return res.status(200).json({ isError: true, error: 'Unauthorized' });
  }

  const result = await verefySait(req.body.id);
  res.send(result);
})

app.post('/api/getDataSait', async (req: Request, res: Response) => {
  const tokens = getToken(req.headers.cookie);
  if (!tokens) {
    return res.status(200).json({ isError: true, error: 'Unauthorized' });
  }
  const result = await getDataSait(req.body.id);
  res.send(result);
});

app.get('/api/startDemon', async (req: Request, res: Response) => {
  const result = await demonAnalyz();
  res.send(result);
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});


