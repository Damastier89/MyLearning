///////////////// Свойства - геттеры и сеттеры /////////////////
// Свойства-аксессоры (accessor properties). По своей сути это функции, которые используются для присвоения и получения значения, 
// но во внешнем коде они выглядят как обычные свойства объекта.
// Свойства-аксессоры представлены методами: «геттер» – для чтения и «сеттер» – для записи. 
// При литеральном объявлении объекта они обозначаются get и set.

const user = {
    get propertiesName() {
      // геттер, срабатывает при чтении user.propName
    },
    set propertiesName(value) {
      // сеттер, срабатывает при записи user.propName = value
    }
  }
  
  const customer = {
    name: "John",
    surname: "Smith",
  
    get fullName() {
      return `${this.name} ${this.surname}`;
    },
  
    set fullName(value) {
      [this.name = name, this.surname] = value.split(" ");
    },
  
    get rename() {
      return this.name;
    },
  
    set rename(value) {
      return this.name = value;
    }
  }
  
  // Снаружи свойство-аксессор выглядит как обычное свойство. В этом и заключается смысл свойств-аксессоров. 
  // Мы не вызываем user.fullName как функцию, а читаем как обычное свойство: геттер выполнит всю работу за кулисами.
  
  // вызвали get fullname
  customer.fullName; // John Smith
  
  // вызвали set fullName
  customer.fullName = "Sergei Lantsev"; // Sergei Lantsev
  
  // вызвали get rename
  customer.rename; // Sergei
  
  // вызвали set rename
  customer.rename = "Kate"; // Kate
  
  // В итоге получили «виртуальные» свойства fullName и rename. Которые можно прочитать и изменить.
  
  
  // Дескрипторы свойств доступа
  // Дескрипторы свойств-аксессоров отличаются от «обычных» свойств-данных.
  // Свойства-аксессоры не имеют value и writable, но взамен предлагают функции get и set.
  // То есть, дескриптор аксессора может иметь:
  
  // get – функция без аргументов, которая сработает при чтении свойства,
  // set – функция, принимающая один аргумент, вызываемая при присвоении свойства,
  // enumerable – то же самое, что и для свойств-данных,
  // configurable – то же самое, что и для свойств-данных.
  
  
  // Умные геттеры/сеттеры
  // Геттеры/сеттеры можно использовать как обёртки над «реальными» значениями свойств, 
  // чтобы получить больше контроля над операциями с ними.
  
  const customerName = {
  
    get name() {
      return this._name;
    },
  
    set name(value) {
      if (value.length < 4) {
        alert(`Имя слишком короткое, должно быть более 4 символов`);
        return;
      }
      this._name = value;
    }
  
  }
  
  // Таким образом, само имя хранится в _name, доступ к которому производится через геттер и сеттер.
  customerName.name = "Maximus"
  
  // Технически, внешний код всё ещё может получить доступ к имени напрямую с помощью customerName._name, 
  // но существует широко известное соглашение о том, что свойства, которые начинаются с символа "_", 
  // являются внутренними, и к ним не следует обращаться из-за пределов объекта.
  
  
  // Использование для совместимости
  // У аксессоров есть интересная область применения – они позволяют в любой момент взять «обычное» свойство и изменить его поведение, 
  // поменяв на геттер и сеттер.
  
  function User(name, age) {
    this.name = name;
    this.age = age;
  }
  
  let john = new User("John", 25);
  
  // Взамен возраста age мы можем решить хранить дату рождения birthday, потому что так более точно и удобно.
  
  function User(name, birthday) {
    this.name = name;
    this.birthday = birthday;
  
    // возраст рассчитывается из текущей даты и дня рождения
    Object.defineProperty(this, "age", {
      get() {
        let todayYear = new Date().getFullYear();
        return todayYear - this.birthday.getFullYear();
      }
    });
  }
  
  let max = new User("max", new Date(1992, 6, 1));
  
  console.log( max.birthday ); // доступен как день рождения
  console.log( max.age );      // ...так и возраст