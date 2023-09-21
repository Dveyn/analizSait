import axios, { AxiosResponse } from "axios";

const isTested = (window.location.hostname === "localhost");

const instance = axios.create({
  baseURL: 'http://localhost:3001/',
  headers: {
    "Content-Type": "application/json",
  } 
})

const link = {
    trainAi: 'train'
}

export const appAPI = {
  train(data:string[], labels:string[]) {
    console.log(data, labels);
    
    return instance
      .post(link.trainAi, {data, labels})
      .then((response) => {
        return response
      })
  },
}
