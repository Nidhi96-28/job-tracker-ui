// refresh.interceptor.ts
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { UserService } from '../../core/services/user.service';

export const refreshInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(UserService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !req.url.includes('/refresh')) {
        return userService.refreshToken().pipe(
          switchMap(() => next(req.clone({ withCredentials: true })))
        );
      }
      return throwError(() => error);
    })
  );
};