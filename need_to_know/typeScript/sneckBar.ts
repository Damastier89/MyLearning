import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";


interface openConfig {
  message: string;
  actionType: string;
}

/* стилизация в файле src/global-style/style.scss */
const actionsData = {/* при добавлении нового типа, необходимо его так же добавить в src/app/_models/SnackBarTypes.ts */
  error: {
    txt: 'Ошибка',
    cssClass: 'ues-snackBar-error'
  },
  success: {
    txt: 'Успешно',
    cssClass: 'ues-snackBar-success'
  },
  warning: {
    txt: 'Предупреждение',
    cssClass: 'ues-snackBar-warning'
  }
};

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(
    private _snackBar: MatSnackBar
  ) { }

  openSnackBar(cfg: openConfig) {
    this._snackBar.open(cfg.message, actionsData[cfg.actionType].txt, {
      duration: 5000,
      panelClass: actionsData[cfg.actionType].cssClass
    });
  }
}

export enum SnackBarTypes {
  Error = 'error',
  Success = 'success',
  Warning = 'warning'
}


// <div class="ues-sign-search">
//   <div *ngIf="!searchBase; else advanced">
//     <app-home-page></app-home-page>
//     <button
//     class="ues-sign-search__button"
//     (click)="searchBase = true">
//     app-home-page
//   </button>
//   </div>

//   <ng-template #advanced>
//     <app-blog-page></app-blog-page>
//   </ng-template>

//   <div class="ues-sign-search__footer footer">
//     <div class="footer__parameters">
//       <mat-checkbox
//         class="footer__checkbox"
//       >
//         Подсвечивать все
//       </mat-checkbox>
//       <mat-checkbox
//         class="footer__checkbox"
//       >
//         Выбрать все
//       </mat-checkbox>
//     </div>

//     <button *ngIf="searchBase" (click)="searchBase = false" class="footer__button">Базовый поиск</button>
//   </div>
// </div>