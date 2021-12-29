/**
* Рекурсивный поиск номера из списка
* @param {Array} list Целевой элемент
* @param {number} item Элемент поиска
* @param {number} low Нижний предел поиска в списке
* @param {number} high Максимальный предел поиска в списке
* @return {(number | null)} Вернет число, если значение найдено или Null в противном случае
*/
function binarySearch(list, item, low = 0, high = list.length - 1) {
let mid = Math.floor((low + high) / 2);
let guess = list[mid];

	if (low > high) return null;

	if (guess === item) {
		return mid;
	} else if (guess > item) {
		high = mid - 1;
		return binarySearch(list, item, low, high);
	} else {
		low = mid + 1;
		return binarySearch(list, item, low, high);
	}
};

/**
* Создает массив, содержащий числа 1...N
* @param {number} n - number N
* @return {Array}
*/
const createArr = (n) => Array.from({length: n}, (v, k) => k + 1);

const myList = createArr(100);

console.log(binarySearch(myList, 3)); // 2
console.log(binarySearch(myList, -1)); // null