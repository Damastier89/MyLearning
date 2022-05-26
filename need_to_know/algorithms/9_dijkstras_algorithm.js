"use strict"
// Алгоритм Дейкстеры (быстреший путь)
// the graph
const graph = {};
graph.start = {};
graph.start.a = 6;
graph.start.b = 2;

graph.a = {};
graph.a.fin = 1;

graph.b = {};
graph.b.a = 3;
graph.b.fin = 5;

graph.fin = {};

// The costs table
const costs = {};
costs.a = 6;
costs.b = 2;
costs.fin = Infinity;

// the parents table
const parents = {};
parents.a = "start";
parents.b = "start";
parents.fin = null;

// Массив для уже обработанных узлов
let processed = [];

/**
 * Find the lowest node
 * @param {Object} itCosts Hash table
 * @returns {(string|null)} The lowest node
 */
function findLowestCostNode(itCosts) {
  let lowestCost = Infinity;
  let lowestCostNode = null;

  Object.keys(itCosts).forEach(node => { //Перебрать всех соседей текущего узла
    const cost = itCosts[node];
    // Если это самая низкая стоимость на данный момент и она еще не обработана
    if (cost < lowestCost && processed.indexOf(node) === -1) {
      // ... установить его в качестве нового узла с наименьшей стоимостью.
      lowestCost = cost;
      lowestCostNode = node;
    }
  }); 
  return lowestCostNode;
};

let node = findLowestCostNode(costs);

while (node !== null) {
  const cost = costs[node];
  // Пройдите через всех соседей этого узла
  const neighbors = graph[node];
  Object.keys(neighbors).forEach(n => {
    const newCost = cost + neighbors[n];
    // Если дешевле добраться до этого соседа, пройдя через этот узел
    if (costs[n] > newCost) {
    // Oбновите стоимость для этого узла
      costs[n] = newCost;
    // Этот узел становится новым родительским для этого соседа.
      parents[n] = node;
    }
  });
  // Отметить узел как обработанный
  processed = processed.concat(node);
  // Найдите следующий узел для обработки и выполните цикл
  node = findLowestCostNode(costs);
}

console.log("Cost from the start to each node:");
console.log(costs); // { a: 5, b: 2, fin: 6 }
