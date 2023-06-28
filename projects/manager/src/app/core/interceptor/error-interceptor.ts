import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
import { StorageService } from '../services/storage/storage.service';
import { StorageEnum } from '../enums/storage/storage-enum';
import { Router } from '@angular/router';
import { STATIC_ROUTES } from '../constant/routes.constant';
import { LoginService } from '../../pages/login-page/service/login.service';
import { TextDialogService } from 'projects/share-libs/src/lib/features/text-dialog/services/text-dialog.service';



@Injectable()
export class ErrorHeaderInterceptor implements HttpInterceptor {

  constructor(
    private loginService:LoginService,
    private textDialogService:TextDialogService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
          catchError((err: HttpErrorResponse) => {
            if(err.status === 403){
              this.loginService.logout();
            }
            this.textDialogService.openErrorDialog(
              {
                title: '錯誤訊息',
                content: err.error?.message
              }
            )
            return throwError(err);
          })
        )
  }
}
