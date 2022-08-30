export class HTTPServise {
  //Передаём HttpClient ангуляра в конструктор
  constructor(private readonly http: HttpClient){}
  
  public sendRequest(): Observable<any> {
    return this.http.get<any>('https://ru.wikipedia.org/wiki/Cp');
  }
}
///////////////////////////////////////////////////////////////////
export class DataService {
  //Знак бакса в конце имени, обычно означает, что это какой-то observable
  private readonly dataList$: Subject<any> = new Subject();
  //Передаём в наш сервис, cервис отвечающий за запросы в констуктор
  constructor(private readonly httpServise: HTTPServise) { }
  
  public getData(): void {
  //Когда вызовем этот метод, httpService вернёт какой-то ответ и мы передадим его в subject
    this.httpServise.sendRequest().subscribe(response => this.dataList$.next(response));
  }
  
  public getDataSubscription(): Observable<any> {
    return dataList$.asObservable()
  }
} 
////////////////////////////////////////////////////////////////////
export class MyComponent {
  public data = null;
  
  constructor(private readonly dataService: DataService) { }
  
  ngOnInit() {
  //Получаем данные с сервера
  this.dataService.getData();
  //Передаём данные в компонент
  this.dataService.getDataSubscription().subscribe(subcriptionData => this.data = subcriptionData);
  }
  
  // Так как у нас подписка, мы теперь можем отправить кучу запросов, и если данные поменяются, то они будут присваиваться нашему полю с данными
  public sendResponseByInterval() {
    setInterval(() => this.dataService.getData(), 10000)
  }
}