import * as tf from '@tensorflow/tfjs';


export async function loadModel() {
  try {
    const model = await tf.loadLayersModel(`file://modelsJson/model.json`);
    console.log(`Модель загружена из modelsJson`);
    return model;
  } catch (error) {
    console.error(`Ошибка загрузки модели: ${error}`);
    return null; // Возвращаем null в случае ошибки
  }
}
