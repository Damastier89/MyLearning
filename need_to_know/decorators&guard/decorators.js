/* function decorator(target: Function): any {
  const newConstructor: Function = function(name: string){
    this.name = "Hello " + name;
  }
  return newConstructor;
}

@decorator
class Programmer {
  lang: 'TypeScript';
  name: string;
  constructor(name){
    this.name = name;
  }
}

let sergei = new Programmer('Sergei')
console.log(sergei); */
//tsc script/decorators.ts --target ES5 --experimentalDecorators
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function decoratorName(target) {
    var newConstructor = function (name) {
        this.name = 'Hello ' + name;
    };
    return newConstructor;
}
var Programmer = /** @class */ (function () {
    function Programmer(name) {
        this.name = name;
    }
    Programmer = __decorate([
        decoratorName
    ], Programmer);
    return Programmer;
}());
var sergei = new Programmer('Sergei89');
console.log(sergei);
