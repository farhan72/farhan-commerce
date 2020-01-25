import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {isNull} from 'util';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(): boolean {
    let status: boolean;
    const token = localStorage.getItem('token');
    if (!isNull(token)) {
      this.router.navigate(['/dashboard']);
      status = false;
    } else {
      status = true;
    }
    return status;
  }

}
