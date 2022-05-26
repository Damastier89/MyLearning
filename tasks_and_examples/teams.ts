interface TEAMS {
  name: string,
  team: string,
  salary: number,
}

const teams: TEAMS[] = [
  {team: 'GSW', salary: 1, name: 'Stephen Curry'},
  {team: 'HOU', salary: 2, name: 'Chris Paul'},
  {team: 'LAL', salary: 3, name: 'LeBron James'},
  {team: 'OKC', salary: 4, name: 'Stephen Curry'},
  {team: 'GSW', salary: 5, name: 'Russell Westbrook'},
  {team: 'DET', salary: 6, name: 'Detroit NBA'},
]

function getTeams(arr: TEAMS[]): void {
  let data: any;
  let totalPrice: any;

  for (let item of arr) {
    data = item;
    console.log(`data :` , data);
  }
  let objValue = Object.values(data);
  console.log('objValue : ', objValue);

  totalPrice = arr.reduce((total: any, item: any) => { return total += item.salary },0);
  console.log(`totalPrice : `, totalPrice);

  let objKeys = Object.keys(data);
  console.log('objKeys : ', objKeys);

  console.log('objKeys - 1 : ', objKeys);
  return data;
}

getTeams(teams);

export class Update {
// Для добавления к строке дополнительной строки
  public updateString(): void {
    const dataAttr = document.querySelectorAll("[data-header]");
    dataAttr.forEach(item => {
      item.textContent += `!`;
    })
  }
}
