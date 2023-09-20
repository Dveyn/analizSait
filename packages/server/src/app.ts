import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3001;

// Обработчик для корневого маршрута
app.get('/', (req: Request, res: Response) => {
  res.send('Привет, мир!');
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
