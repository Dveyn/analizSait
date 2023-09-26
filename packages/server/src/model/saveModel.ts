import * as tf from '@tensorflow/tfjs';
import pool from '../utils/db';

export async function saveModel(model: tf.LayersModel) {
  const currentDate = new Date().toISOString().split('T')[0];

  const modelJSON = model.toJSON();
  try {
    await pool.query('INSERT INTO models(date, json) VALUES($1, $2)', [currentDate, JSON.stringify(modelJSON)]);
    console.log(`Модель сохранена в PostgreSQL с датой сохранения ${currentDate}`);
  } catch (error) {
    console.error('Ошибка при сохранении модели в PostgreSQL:', error);
  }
}


