import { Injectable } from '@nestjs/common';
import { AsyncCacheDedupe } from '../src/index.js';

@Injectable()
export class TestService {
  private myName: string;

  constructor() {
    this.myName = 'haha';
  }

  @AsyncCacheDedupe()
  async run(name: string, age: number) {
    return this._run(name, age);
  }

  private async _run(name: string, age: number) {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const data = {
      name,
      age,
      myName: this.myName,
    };
    console.log('res',data);
    console.log('done');

    return {
        name,
        age,
       myName: this.myName,
    };
  }

  @AsyncCacheDedupe({
    ttl: 5,
  })
  async runWithObj(options: { name: string; age: number }) {
    return this._runWithObj(options);
  }

  private async _runWithObj(options: { name: string; age: number }) {
    await new Promise((resolve) => setTimeout(resolve, 100));


    console.log('res',{name: options.name, age: options.age, myName: this.myName});
    console.log('done');

    return true;
  }
}
