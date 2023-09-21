import * as tf from '@tensorflow/tfjs';

const VOCABULARY_SIZE = 10000; // Размер словаря (количество уникальных слов)
const EMBEDDING_DIM = 16; // Размерность векторов слов
const MAX_SEQUENCE_LENGTH = 250; // Максимальная длина последовательности слов
const LSTM_UNITS = 32; // Количество нейронов в LSTM слое
const NUM_CLASSES = 3; // Количество классов (ваша задача классификации)
const NUM_EPOCHS = 10; // Добавляем переменную для количества эпох обучения

// Функция создания модели
function createModel() {
  const model = tf.sequential();

  model.add(tf.layers.embedding({
    inputDim: VOCABULARY_SIZE,
    outputDim: EMBEDDING_DIM,
    inputLength: MAX_SEQUENCE_LENGTH,
  }));

  model.add(tf.layers.lstm({
    units: LSTM_UNITS,
    returnSequences: false
  }));

  model.add(tf.layers.dense({
    units: NUM_CLASSES,
    activation: 'softmax'
  }));

  model.compile({
    optimizer: 'adam',
    loss: 'sparseCategoricalCrossentropy',
    metrics: ['accuracy']
  });

  return model;
}

// Функция обучения модели
export function trainModel(inputData: string[], inputLabels: number[]) {
  const trainData = tf.tensor2d(inputData);
  const trainLabels = tf.tensor1d(inputLabels, 'int32');

  const model = createModel(); // Создаем модель

  model.fit(trainData, trainLabels, {
    epochs: NUM_EPOCHS,
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        console.log(`Epoch ${epoch + 1} - loss: ${logs?.loss}, accuracy: ${logs?.acc}`);
      }
    }
  }).then(info => {
    console.log('Обучение завершено:', info);
  });
}

