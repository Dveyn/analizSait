import { makeAutoObservable } from 'mobx';

class StoreAPP {
  someValue: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  setSomeValue(value: string) {
    this.someValue = value;
  }
}

const store = new StoreAPP();
export default store;
