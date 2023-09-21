import axios, { AxiosResponse } from "axios";

const isTested = (window.location.hostname === "localhost");

const instance = axios.create({
  baseURL: 'http://localhost:3001/',
  headers: {
    "Content-Type": "application/json",
  } 
})

const link = {
    trainAi: 'train',
    predict: 'predict'
}

export const appAPI = {
  train(data:string[], labels:string[]) {
    return instance
      .post(link.trainAi, {data, labels})
      .then((response) => {
        return response
      })
  },
  predict(data:string[]) {
    return instance
      .post(link.predict, {data})
      .then((response) => {
        return response
      })
  },
}
