import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService, public router: Router) {}

  async canActivate() {
    if (!await this.loginService.checkAuthenticated()) {
      await this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}