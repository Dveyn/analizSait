import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { decodePredictions, predict, trainModel } from './model/trainModel'; // Импортируем функцию для обучения модели
import { async } from 'q';

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
  const decodedPredictions = await decodePredictions(resuls);
  res.send(decodedPredictions);
});

//Ручка для получения значения обучаемости
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
 