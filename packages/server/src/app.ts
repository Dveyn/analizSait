import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { trainModel } from './model/trainModel'; // Импортируем функцию для обучения модели 
import { decodePredictions, predict } from './model/predict';
import { signup } from './users/auth';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

// Разрешаем CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); 
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); 
  next();
});

// Ручка для принятия данных и запуска обучения модели
app.post('/train', async (req: Request, res: Response) => {

  const inputData = req.body.data; // Данные для обучения (тексты статей)
  const inputLabels = req.body.labels; // Метки классов


  const history = await trainModel(inputData, inputLabels);
  res.send(history);
});

app.post('/predict', async (req: Request, res: Response) => {

  const inputData = req.body.data; // Данные для обучения (тексты статей)

  const resuls = await predict(inputData);
  if(!resuls) return res.send("Не удалось прогнозировать данные");
  const decodedPredictions = await decodePredictions(resuls);
  res.send(decodedPredictions);
});

//Ручка авторизации 

app.post('/login', async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;

  const result = await signup(email, password);
  res.send(result);
});

  app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
  });
   