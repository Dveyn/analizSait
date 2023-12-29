import { makeAutoObservable } from 'mobx';

class UserStore {
  id: number = 0;
  email: string = '';
  isAuth: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setUserData(data: {id: number, email: string, isAuth: boolean}) {
    this.email = data.email;
    this.id = data.id;
    this.isAuth = data.isAuth;
    console.log(data);
  }
  clearUserData() { 
    this.email = '';
    this.id = 0;
    this.isAuth = false; 
  }
}

const userStore = new UserStore();
export default userStore;
