import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { trainModel } from './model/trainModel'; // Импортируем функцию для обучения модели

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
app.post('/train', (req: Request, res: Response) => {

  const inputData = req.body.data; // Данные для обучения (тексты статей)
  const inputLabels = req.body.labels; // Метки классов

  // Находим максимальную длину последовательности
  const maxSeqLength = Math.max(...inputData.map((seq:number[]) => seq.length));

  // Выравниваем все последовательности до максимальной длины
  const paddedSequences = inputData.map((seq:number[]) => {
    if (seq.length >= maxSeqLength) {
      return seq.slice(0, maxSeqLength);
    } else {
      const test = [...seq, ...Array(maxSeqLength - seq.length).fill(0)];
      console.log(test);
      
      return test.join(" ")
    }
  });

  trainModel(paddedSequences, inputLabels, inputData.length);

  res.send('Обучение начато');
});

//Ручка для получения значения обучаемости
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
