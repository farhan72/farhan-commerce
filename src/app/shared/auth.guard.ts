import { LayoutComponent } from './../module/layout/layout.component';
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginComponent } from '../module/auth/login/login.component';
import {AuthService} from './services/auth.service';
import {map, take, tap} from 'rxjs/operators';
import {loggedIn} from '@angular/fire/auth-guard';
import {isNull} from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private route: Router,
              private authService: AuthService) {}
  canActivate(next, state) {
    let status: any;

    const token = localStorage.getItem('token');
    if (!isNull(token)) {
      const currentUser = this.authService.currentUserValue;
      if (currentUser) {
        status = true;
      } else {
        this.route.navigate(['/login']);
        status = false;
      }
    } else {
      status = this.authService.user$.pipe(
        take(1),
        map(user => !!user), // map to boolean
        tap(loggedIn => {
          if (!loggedIn) {
            this.route.navigate(['/login']);
          }
        })
      );
    }
    return status;
  }
}
