interface Animal {
  voice();
}

interface Fish extends Animal {
  swim();
}

interface Bird extends Animal {
  fly();
}

class Bird implements Bird {
  public fly(){};
  public voice(){};
}

class Fish implements Fish {
  public swim(){};
  public voice(){};
}

class Main {
  fish = new Fish();
  bird = new Bird();

  animalIsDointActions(animal: Bird | Fish) {
    animal.voice();
    if (this.isFish(animal)) {
      animal.swim();
    } else {
      animal.fly();
    }
  }

  isFish(animal: Fish | Bird): animal is Fish {
    return animal instanceof Fish;
  }
}