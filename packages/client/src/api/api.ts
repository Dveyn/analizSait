import axios, { AxiosResponse } from "axios";
import { signinType, signupType } from "./types/user";


const instance = axios.create({
  baseURL: 'http://localhost:3001/',
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
})

const link = {
  trainAi: 'api/train',
  predict: 'api/predict',
  signin: 'api/signin',
  signup: 'api/signup',
  getAuth: 'api/get',
  addSait: 'api/addSait',
  getSait: 'api/getSait',
  sendVerefySait: 'api/sendVerefySait',
}

export const appAPI = {
  train(data: string[], labels: string[]) {
    return instance
      .post(link.trainAi, { data, labels })
      .then((response) => {
        return response
      })
  },
  predict(data: string[]) {
    return instance
      .post(link.predict, { data })
      .then((response) => {
        return response
      })
  },
  signin(data: signinType) {
    return instance
      .post(link.signin, data)
      .then((response) => {
        return response
      })
  },
  signup(data: signupType) {
    return instance
      .post(link.signup, data)
      .then((response) => {
        return response
      })
  },
  getAuth() {
    return instance
      .get(link.getAuth)
      .then((response) => {
        return response
      })
  },
  addSait(url: string) {
    return instance
      .post(link.addSait, { url })
      .then((response) => {
        return response
      })
  },
  getSait() {
    return instance
      .get(link.getSait)
      .then((response) => {
        return response
      })
  },
  sendVerefySait(id: number) {
    return instance
      .post(link.sendVerefySait, { id })
      .then((response) => {
        return response
      })
  }
}
