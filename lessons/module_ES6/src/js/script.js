import sayHello from './main.js'; // Импорт по умолчанию (может быть только один в файле)
import { one , two } from './main.js'; // Просто импортируем
// import { one as first } from './main'; // Переименовываем после импорта
// import * as data from './main'; // Импортируем всё из выбранного файла

console.log(`${one} and ${two}`);
// console.log(`${first}`);
// console.log(`${data.one} and ${data.two}`);
// data.sayHello();
sayHello();


// НЕ забывать добавлять расширение файлов при импорте и ставить тегу скрипт type="module" !!!
