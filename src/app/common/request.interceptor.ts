import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';

import { AppState } from '../models/app-state.model';
import { appSettings } from '../../app-settings/app-settings';
import { LocalStorageUser } from '../models/user.model';;

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.store.select('state', 'user', 'data', 'authToken')
      .take(1)
      .subscribe((authToken) => {
        if (authToken) {
          request = request.clone({
            setHeaders: {
              Authorization: authToken
            }
          });
        }
      });

    return next.handle(request).do((event: HttpEvent<any>) => {
      this.extendTokenExpiration();

      return event;
    }, (err: any) => {
      if (err instanceof HttpErrorResponse && err.status === 401) {
        localStorage.removeItem('adshUser');
        this.router.navigate(['/auth', 'login']);
      }
    });
  }

  extendTokenExpiration() {
    const localStorageUser: LocalStorageUser = JSON.parse(localStorage.getItem('adshUser'));

    if (!localStorageUser) {
      return;
    }

    const expirationSeconds = localStorageUser.remember ?
      appSettings.REMEMBER_USER_EXPIRATION_SECONDS : appSettings.AUTH_TOKEN_EXPIRATION_SECONDS;

    Object.assign(localStorageUser, { expiration: ((+new Date) / 1000 | 0) + expirationSeconds });

    localStorage.setItem('adshUser', JSON.stringify(localStorageUser));
  }
}