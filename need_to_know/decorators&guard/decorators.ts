
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

function decoratorName(target: Function): any {
  const newConstructor: Function = function(name: string) {
    this.name = 'Hello ' + name;
  }
  return newConstructor;
}

@decoratorName
class Programmer {
  lang: 'TypeScript';
  name: string;

  constructor(name) {
    this.name = name;
  }
}

let sergei = new Programmer('Sergei89')
console.log(sergei);

