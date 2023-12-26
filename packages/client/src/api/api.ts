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
  signup: 'signup',
  signin: 'signin',
  getAuth: 'get',

}

export const appAPI = {
  signup(data: signupType) {
    return instance
      .post(link.signup, data)
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
  getAuth() {
    return instance
      .get(link.getAuth)
      .then((response) => {
        return response
      })
  },
}
