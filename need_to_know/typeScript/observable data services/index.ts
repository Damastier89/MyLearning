// class HTTPServise {
//   //Передаём HttpClient ангуляра в конструктор
//   constructor(private readonly http: HttpClient){}
  
//   public sendRequest() {
//   return this.http.get<T>('https://ru.wikipedia.org/wiki/Cp')
//    }
//   }
//   ///////////////////////////////////////////////////////////////////
//   class DataService {
  
//   //Знак бакса в конце имени, обычно означает, что это какой-то observable
//   private readonly dataList$: Subject<T> = new Subject();
//   //Передаём в наш сервис, cервис отвечающий за запросы в констуктор
//   constructor(private readonly httpServise: HTTPServise) { }
  
//   public getData() {
//   //Когда вызовем этот метод, httpService вернёт какой-то ответ и мы передадим его в subject
//   this.httpService.sendRequest.subscribe(response => this.dataList.next(response)
//    }
  
//   public getDataSubscription(){
//   return dataList$.asObservable()
//    }
//   } 
//   ////////////////////////////////////////////////////////////////////
//   class MyComponent() {
//   public data = null;
  
//   constructor(private readonly dataService: DataService) { }
  
//    public ngOnInit() {
//   //Получаем данные с сервера
//   this.dataService.getData();
//   //Передаём данные в компонент
//   this.dataService.getDataSubscription.subscribe(subcriptionData => this.data = subcriptionData)
//   }
  
//   // Так как у нас подписка, мы теперь можем отправить кучу запросов, и если данные поменяются, то они будут присваиваться нашему полю с данными
  
//   public sendResponseByInterval() {
//   setInterval(() => this.dataService.getData(), 10000)
//    }
//   }