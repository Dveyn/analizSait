import * as tf from '@tensorflow/tfjs';

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
    returnSequences: false
  }));

  model.add(tf.layers.dense({
    units: numClasses,
    activation: 'softmax'
  }));

  model.compile({
    optimizer: 'adam',
    loss: 'sparseCategoricalCrossentropy',
    metrics: ['accuracy']
  });

  return model;
}

export function trainModel(inputData: string[], inputLabels: number[], numClasses: number): void {
  console.log(inputData);
  const maxSentenceLength = Math.max(...inputData.map(sentence => sentence.split(' ').length));
  const model = createModel(maxSentenceLength, numClasses);
 
  const trainData = tf.tensor2d(inputData.map(sentence => sentence.split(' ').map(word => parseFloat(word))));

  const trainLabels = tf.tensor1d(inputLabels);

  model.fit(trainData, trainLabels, {
    epochs: NUM_EPOCHS,
    callbacks: {
      onEpochEnd: async (epoch, logs) => {
        console.log(`Epoch ${epoch + 1} - loss: ${logs?.loss}, accuracy: ${logs?.acc}`);
      }
    }
  }).then(info => {
    console.log('Обучение завершено:', info);
  });
}
