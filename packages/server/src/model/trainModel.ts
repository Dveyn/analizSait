import * as tf from '@tensorflow/tfjs';
import { createModel } from './createModel';
import { loadModel } from './loadModel';
import { saveModel } from './saveModel';




export async function trainModel(inputData: string[], inputLabels: string[],) {
  let model = await loadModel();
  const maxLength = Math.max(...inputData.map(str => str.length));
  if(!model) { 
    model = createModel(maxLength, inputData.length);
  }
 


  const textAsNumber = inputData.map((sentence, index) => {

    if (sentence.length < maxLength) {
      const countRepiat = (maxLength - sentence.length) - 1;
      const padding = '0'.repeat(countRepiat);
      sentence = sentence + " " + ((countRepiat > 1) ? padding : "");
    }
    return sentence.split('').map(char => char.charCodeAt(0));
  });
  const trainData = tf.tensor2d(textAsNumber, [textAsNumber.length, maxLength]);

  const uniqueLabels = Array.from(new Set(inputLabels));
  const labelMap = new Map(uniqueLabels.map((label, index) => [label, index]));

  const numericLabels = inputLabels.map(label => label !== undefined ? labelMap.get(label) : undefined);
  const validNumericLabels = numericLabels.filter(label => label !== undefined) as number[];
  const trainLabels = tf.tensor1d(validNumericLabels);

  const history = await model.fit(trainData, trainLabels, {
    epochs: 10,
    callbacks: {
      onEpochEnd: async (epoch, logs) => {
        console.log(`Epoch ${epoch + 1} - loss: ${logs?.loss}, accuracy: ${logs?.acc}`);
      }
    }
  });
  await saveModel(model);
  return history;
}



// async function trainAndSave() {
//   const inputData = ['ваш_набор_данных'];
//   const inputLabels = ['ваш_набор_меток'];

//   // Если модель уже загружена, используем ее
//   if (!model) {
//     const maxLength = Math.max(...inputData.map(str => str.length));
//     model = createModel(maxLength, inputData.length);
//   }

//   const history = await trainModel(model, inputData, inputLabels);
  
//   // После завершения обучения, сохраняем модель
//   await saveModel(model, 'путь/к/директории');
// }


// // Пример загрузки и использования модели
// async function loadAndPredict() {
//   // Загружаем модель
//   const loadedModel = await loadModel('путь/к/директории');

//   // Предсказываем
//   const predictions = await predict(['ваш_набор_данных_для_предсказания']);
//   const decodedPredictions = await decodePredictions(predictions);

//   console.log(decodedPredictions);
// }





