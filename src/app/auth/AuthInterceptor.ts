import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, finalize, retry} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Const} from '../core/const';
import {Utils} from '../core/utils';

let countRequest = 0;

function response() {
  if (Utils.getToken()) {
    countRequest -= 1;
    if (countRequest === 0) {
      let documento: any;
      documento = window;
      documento.inactiveLoading();
    }
  }
}

function loading() {
  if (Utils.getToken()) {
    countRequest += 1;
    let documento: any;
    documento = window;
    documento.activeLoading();
  }

}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    loading();
    return next.handle(request).pipe(
      finalize(() => {
        response();
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === Const.httpStatus.unauthorized) {
          Utils.deleteToken();
          this.router.navigate(['login']);
        }
        response();
        return throwError(error);
      })
    );
  }
}
