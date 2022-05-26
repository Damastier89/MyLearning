import { A } from "./a";
import { B } from "./b";

export class C {
  c = 'c';
  b = new B(new A());
  e = new B(new C())

  getC () {
    return this.c + this.b;
  }
}