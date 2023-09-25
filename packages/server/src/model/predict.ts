import { createModel } from "./createModel";
import * as tf from '@tensorflow/tfjs';
import { loadModel } from "./loadModel";


export async function predict(inputData: string[]) {
  const model = await loadModel();
  if(!model) return null
  
  const maxLength = Math.max(...inputData.map(str => str.length));

  const textAsNumber = inputData.map((sentence, index) => {
    if(sentence.length < maxLength){  
      const countRepeat = (maxLength - sentence.length) - 1;
      const padding = '0'.repeat(countRepeat);
      sentence = sentence + " " + ((countRepeat > 1) ? padding : "");
    }
    return  sentence.split('').map(char => char.charCodeAt(0));
  });

  const testData = tf.tensor2d(textAsNumber, [textAsNumber.length, maxLength]);
  const outputTensor = model.predict(testData) as tf.Tensor;
  const outputData = await outputTensor.array() as number[][];

  testData.dispose();
  outputTensor.dispose();

  return outputData;
}

export async function decodePredictions(predictions: number[][]): Promise<string[]> {
  const decodedPredictions = predictions.map(prediction => {
    const decodedSentence = prediction.map(charCode => String.fromCharCode(charCode)).join('');
    return decodedSentence.trim();
  });

  return decodedPredictions;
}

