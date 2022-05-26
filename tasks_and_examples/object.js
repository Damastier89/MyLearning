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