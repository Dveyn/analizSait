import * as tf from '@tensorflow/tfjs';
import fs from 'fs';

export async function saveModel(model: tf.LayersModel) {
  const directory = 'modelsJson';

  if (!fs.existsSync(directory)) {
     fs.mkdirSync(directory);
  }

  const modelJSON = model.toJSON();
  // await model.save(`file://modelsJson`);
  await model.save('file://my_model.json')
  console.log(`Модель сохранена в .... a не знаю где`);
}



