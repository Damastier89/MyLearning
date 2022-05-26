import { A } from "./a";

interface SomeInterface {};

export class B {
  b = 'b';
  a = new A();
  e = new A();

  constructor(newA: SomeInterface) {}

  getB () {
    return this.b + this.a.a;
  }
}