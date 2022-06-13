// AppModule
//   {
//     provide: APP_INITIALIZER,
//     useFactory: (configService: ModeTasksService) => () => configService.load(),
//     deps:[ModeTasksService],
//     multi: true
//   }

// Сервис в котором получаются данные, которые должны быть получены перед загрузкой приложения
// @Injectable({
//   providedIn: 'root'
// })
// export class ModeTasksService {
// // это нужно
//   public updateСonditionMode: ReplaySubject<ModeTasks> = new ReplaySubject<ModeTasks>(1);

//   constructor( private http: HttpClient ) {}
// // это нужно
//   public load(): Promise<any> {
//     return this.getCurrentMode()
//       .toPromise()
//       .catch((err: any) => Promise.resolve());
//   }

//   private getCurrentMode(): Observable<ModeTasks> {
//     return this.http.get<ModeTasks>(${environment.serverUrl}/mode/api/v0/query/)
//       .pipe(
//         tap((data: ModeTasks) => this.updateСonditionMode.next(data)),  // тут получаем данные и передаем их в ReplaySubject
//       );
//   }

//   public setMode(modeId): Observable<ModeTasks> {
//     return this.http.post<ModeTasks>(environment.serverUrl + '/mode/api/v0/set_mode/', {mode: modeId})
//       .pipe(
//         pluck('mode'),
//         tap((data: ModeTasks) => this.updateСonditionMode.next(data)), // тут получаем данные и передаем их в ReplaySubject
//       );
//   }
// }

// Компонент который использует этот сервис. Метод данного компонента
//   public setModeTasks(): void {
//     this.modeTasks.updateСonditionMode.pipe(takeUntil(this.destroyNotifier)).subscribe((currentMode: ModeTasks) => {
//       this.currentMode = currentMode;
//     });
//   }