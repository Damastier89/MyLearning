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














