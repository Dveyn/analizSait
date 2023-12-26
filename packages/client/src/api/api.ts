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
  signup: 'signup'
  
}

export const appAPI = {
  signup(data: signupType) {
    return instance
      .post(link.signup, data)
      .then((response) => {
        return response
      })
  },
}
