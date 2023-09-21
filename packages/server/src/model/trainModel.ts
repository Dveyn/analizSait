import * as tf from '@tensorflow/tfjs';
import { async } from 'q';

const VOCABULARY_SIZE = 10000;
const EMBEDDING_DIM = 16;
const LSTM_UNITS = 32;
const NUM_EPOCHS = 10;

function createModel(maxSentenceLength: number, numClasses: number): tf.Sequential {
  const model = tf.sequential();

  model.add(tf.layers.embedding({
    inputDim: VOCABULARY_SIZE,
    outputDim: EMBEDDING_DIM,
    inputLength: maxSentenceLength,
  }));

  model.add(tf.layers.lstm({
    units: LSTM_UNITS,
    returnSequences: false,
    kernelInitializer: 'glorotNormal', // Пример альтернативной инициализации
    recurrentInitializer: 'glorotNormal' // Пример альтернативной инициализации
  }));

  model.add(tf.layers.dense({
    units: numClasses,
    activation: 'softmax'
  }));

  model.compile({
    optimizer: 'adam',
    loss: 'sparseCategoricalCrossentropy', // Вместо 'sparseCategoricalCrossentropy'
    metrics: ['accuracy']
  });

  return model;
}

export async function trainModel(inputData: string[], inputLabels: string[],) {
  console.log(inputData);
  const maxLength = Math.max(...inputData.map(str => str.length));
  const model = createModel(maxLength, inputData.length);


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
    epochs: NUM_EPOCHS,
    callbacks: {
      onEpochEnd: async (epoch, logs) => {
        console.log(`Epoch ${epoch + 1} - loss: ${logs?.loss}, accuracy: ${logs?.acc}`);
      }
    }
  });

  return history;
}


export async function predict(inputData: string[]) {
  const maxLength = Math.max(...inputData.map(str => str.length));
  const model = createModel(maxLength, inputData.length);

  const textAsNumber = inputData.map((sentence, index) => {
    if(sentence.length < maxLength){
      const countRepiat = (maxLength- sentence.length)-1;
      const padding = '0'.repeat(countRepiat);
      sentence = sentence + " " + ((countRepiat > 1) ? padding : "");
    }
    return  sentence.split('').map(char => char.charCodeAt(0));
  });

  const testData = tf.tensor2d(textAsNumber, [textAsNumber.length, maxLength]);
  return model.predict(testData);
}
