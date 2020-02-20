import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(public router: Router) {}
  canActivate(): boolean {
    const isLogin = JSON.parse(localStorage.getItem('login'));
    if (!isLogin) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
