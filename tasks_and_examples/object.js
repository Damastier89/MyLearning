"use strict";
// Разница в том, что через Object.keys будут получены итерируемые свойства а,
// через Object.getOwnPropertyNames все свойства.

console.log(Object.keys(user)); // ['name', 'age', 'isAdmin'] 
console.log(Object.getOwnPropertyNames(user)); // ['name', 'age', 'isAdmin']

console.log(Object.keys(first)); // ['0', '1', '2', '3', '4']
console.log(Object.getOwnPropertyNames(first)); // ['0', '1', '2', '3', '4', 'length']

// Для перебора объекта и редактирования его параметров

// var PresentationElement = function (name, operationType, params, baseUesInstance, entityType = null) {
//   this._name = name;
//   this._params = params;
//   this._baseUesInstance = baseUesInstance;
//   this._entityType = this.createEntityType(operationType, entityType);
//   this._type = "element";
//   this._operationType = operationType;
// }

// PresentationElement.prototype.editParams = function(presentationProperty, presentationParams = null) {
//   if (presentationProperty) {
//       Object.entries(presentationProperty).forEach(([key, value]) => {
//         if (value !== undefined && value !== null) {
//           this[_${key}] = value;
//       }
//     })
//   };

//   if (presentationParams) {
//       Object.entries(presentationParams).forEach(([key, value]) => {
//         if (value !== undefined && value !== null) {
//           this._params[key] = value;
//       }
//     })
//   };
// }

// Перебор вложенного объекта
const personalPlanPeter = {
  name: "Peter",
  age: "29",
  skills: {
      languages: ['ru', 'eng'],
      programmingLangs: {
          js: '20%',
          php: '10%'
      },
      exp: '1 month',
  },
  showAgeAndLangs: function(plan) {
    const {languages} = plan.skills;
    return `Мне ${this.age} и я владею языками: ${languages}`;
  }
};

console.log(personalPlanPeter.showAgeAndLangs(personalPlanPeter));

function showExperience(plan) {
  let result;

  for (let i in plan) {
    if (typeof(plan[i]) === 'object') {
      for (let j in plan[i]) {
        if (typeof(plan[i][j]) === 'string') {
        result = plan[i][j];
        }
      }
    }
  }

  return result;

  // const {exp} = plan.skills;
  // return exp;
}

console.log(showExperience(personalPlanPeter));

function showProgrammingLangs(plan) {
  let result = '';

  for (let i in plan) {
    if (typeof(plan[i]) === 'object') {
      for (let j in plan[i]) {
        if (typeof(plan[i][j]) === 'object') {
          result = `Язык ${Object.keys(plan[i][j])} изучен мною на ${Object.values(plan[i][j])}`;
        }
      }
    }
  }

  return result;

  // let str = '';
  // const {programmingLangs} = plan.skills;
  // for (let key in programmingLangs) {
  //     str += Язык ${key} изучен на ${programmingLangs[key]}\n
  // }

  // return str;
}

console.log(showProgrammingLangs(personalPlanPeter));

// работа с массивами и объектами
const shoppingMallData = {
  shops: [
    {
        width: 10,
        length: 5
    },
    {
        width: 15,
        length: 7
    },
    {
        width: 20,
        length: 5
    },
    {
        width: 8,
        length: 10
    }
  ],
  height: 5,
  moneyPer1m3: 30,
  budget: 50000
}

function isBudgetEnough(data) {
  const {height, moneyPer1m3, budget} = data;
  let messageAboutPayment = '';
  let allAquareShops;
  
  for (let i in data) {
    if (typeof(data[i]) === 'object') {
      allAquareShops = data[i].reduce((acc, item) => {
        return acc += item.width * item.length;
      },0);
    }
  }

  let sizeAllMall = allAquareShops * height;
  let paymentForServices = sizeAllMall * moneyPer1m3;

  if (paymentForServices > budget) {
    messageAboutPayment += `Оплата услуг в ${paymentForServices}₽ превышает бюджет, который сейчас составляет ${budget}₽.`;
  } else {
    messageAboutPayment += `Бюджета в ${budget}₽ хватает для оплаты услуг. Стоимость услуг составляет ${paymentForServices}₽.`;
  }


  return `Общая площадь всех магазинов : ${allAquareShops} м².\nОбъем всех помещений : ${sizeAllMall} м³.\n${messageAboutPayment}`;
}

console.log(isBudgetEnough(shoppingMallData));

// Пребрать массив и вернуть следующий результат :
// [
//   [ 'Andrew', 'Ann', 'Bernard' ],
//   [ 'Cris', 'Josh', 'Mark' ],
//   [ 'Peter', 'Sam', 'Sandra' ],
//   'Оставшиеся студенты : - '
// ]
const students = ['Peter', 'Andrew', 'Ann', 'Mark', 'Josh', 'Sandra', 'Cris', 'Bernard', 'Takesi', 'Sam'];
const studentsMinusOne = ['Peter', 'Andrew', 'Ann', 'Mark', 'Josh', 'Sandra', 'Cris', 'Bernard', 'Sam'];
const studentsPlusOne = ['Peter', 'Andrew', 'Ann', 'Mark', 'Josh', 'Sandra', 'Cris', 'Bernard', 'Takesi', 'Sam', 'Somebody'];

function sortStudentsByGroups(arr) {
  
  const sortNames = arr.sort();
  const result = [];
  let lastName;

  for (let i = 0; i <= 3; i++) {
    result.push(sortNames.splice(0, 3));
  }
  
  lastName = result.pop().join(', ');

  if (lastName === '') {
    result.push(`Оставшиеся студенты : - `);
  } else {
    result.push(`Оставшиеся студенты : ${lastName}`);
  }
  
  return result;
}

console.log(sortStudentsByGroups(students));
console.log(sortStudentsByGroups(studentsMinusOne));
console.log(sortStudentsByGroups(studentsPlusOne));


