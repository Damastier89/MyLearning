"use strict"
// Поиск в ширину
const graph = {};
graph["you"] = ["alice", "bob", "claire"];
graph["bob"] = ["anuj", "peggy"];
graph["alice"] = ["peggy"];
graph["claire"] = ["thom", "jonny"];
graph["anuj"] = [];
graph["peggy"] = [];
graph["thom"] = [];
graph["jonny"] = [];

/**
 * Определяет, является ли человек продавцом
 * @param {string} name Friend's name 
 * @returns {boolean} Result of checking
 */
function personIsSeller(name) {
  return name[name.length - 1] === 'm'
}

function breadthFirstSearch(name) {
  let searchQueue = []; // Создаем новую очередь 
  searchQueue = searchQueue.concat(graph[name]); // Все соседи добавляются в очередь поиска
  // Этот массив позволяет отслеживать, каких людей вы искали раньше.
  const searched = [];
  while (searchQueue.length) { // Пока очередь не пуста
    let person = searchQueue.shift();
    // Ищет этого человека только в том случае, если вы его еще не искали
    if (searched.indexOf(person) === -1) {
      if (personIsSeller(person)) {
        console.log(`${person} is mango seller!`);
        return true;
      }

      searchQueue = searchQueue.concat(graph[person]);
      // Помечает этого человека как искомого
      searched.push(person);
    }
  }
  return false;
}

breadthFirstSearch('you');

///////// Recursive ///////////
/**
 * Determine whether a person is a seller
 * @param {string} name Friend's name
 * @returns {boolean} Result of checking
 */
 function personIsSeller(name) {
  return name[name.length - 1] === "m";
}

/**
 * Find a mango seller
 * @param {string} name Friend's name
 * @param {Object} graph Hash table
 * @returns {boolean} Search results
 */
function search(name, graph) {
  graph = graph || {};
  /**
   * Recursive function to check people
   * @param {Array} waited List of people you need to check
   * @param {Array} visited List of checked people
   */
  function inner(waited, visited) {
    waited = waited || [];
    if (waited.length === 0) return false;
    const person = waited[0];
    const waitedCloned = waited.slice(1);
    if (visited.indexOf(person) !== -1) return inner(waitedCloned, visited);
    if (personIsSeller(person)) {
      console.log(person + " is a mango seller!");
      return true;
    }
    return inner(waitedCloned.concat(graph[person]), visited.concat(person));
  }
  return inner(graph[name], []);
}

search("you", graph);












