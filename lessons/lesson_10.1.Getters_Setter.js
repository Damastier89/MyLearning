/* Геттеры/сеттеры можно использовать как обёртки над «реальными» значениями свойств, чтобы получить больше контроля над операциями с ними.
Например, если мы хотим запретить устанавливать короткое имя для user, мы можем использовать сеттер name для проверки, а само значение хранить в отдельном свойстве _name: */

let user = {
  firstName: 'Sergey',
  lastName: 'Lantcev',

  get fullName() {
      return `${this.firstName} ${this.lastName}`;
  },
  set fullName(value) {
      [this.firstName, this.lastName] = value.split(' ');
  }
};

console.log(user);
console.log(user.fullName);
console.log(user.fullName = 'Alisa Back');
console.log(user);

let users = {
  get name() {
      return this._name;
  },

  set name(value) {
      if (value.length < 4) {
          alert("Имя слишком короткое, должно быть более 4 символов");
          return;
      }
      this._name = value;
  }
};

user.name = "Pete";
console.log(user.name);