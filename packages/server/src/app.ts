import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { trainModel } from './trainModel'; // Импортируем функцию для обучения модели

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

// Ручка для принятия данных и запуска обучения модели
app.post('/train', (req: Request, res: Response) => {
  const inputData = req.body.data; // Данные для обучения (тексты статей)
  const inputLabels = req.body.labels; // Метки классов

  trainModel(inputData, inputLabels); // Запускаем обучение модели

  res.send('Обучение начато');
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
