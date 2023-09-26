import * as tf from '@tensorflow/tfjs';
import pool from '../utils/db';

export async function loadModel() {
  try {
    const query = {
      text: 'SELECT json FROM models ORDER BY date DESC LIMIT 1',
    };
    const result = await pool.query(query);
    if (result.rows.length > 0 && result.rows[0].json) {
      const modelJSON = JSON.parse(result.rows[0].json);
      const model = await tf.loadLayersModel(tf.io.fromMemory(modelJSON));
      return model;
    }
    return null;
  } catch (error) {
    console.error('Ошибка при чтении модели из PostgreSQL:', error);
    return null;
  }
}
