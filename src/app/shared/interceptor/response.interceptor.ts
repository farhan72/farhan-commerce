import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {LoadingService} from '../services/loading.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService,
              private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).lift(
      (event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.loadingService.hide();
        }
      });
  }
}
