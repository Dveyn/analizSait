import * as tf from '@tensorflow/tfjs';


const VOCABULARY_SIZE = 10000;
const EMBEDDING_DIM = 16;
const LSTM_UNITS = 32;

export function createModel(maxSentenceLength: number, numClasses: number): tf.Sequential {
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
