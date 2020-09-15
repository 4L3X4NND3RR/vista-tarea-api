import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message } from '../common/message';
import { Token } from '../common/token';
import { User } from '../common/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'http://localhost:3000/api/';

  public isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) { }

  login(user: User): Observable<Token> {
    return this.httpClient.post<Token>(this.baseUrl + 'autenticacion', user);
  }

  async checkAuthenticated() {
    const authenticated = await this.httpClient.get<Message>(this.baseUrl + 'verificacion').toPromise();
    if (authenticated.mensaje == 'Token no proveido' || authenticated.mensaje == 'Token invalido') {
      this.isAuthenticated.next(false);
      return false;
    }
    return true;
  }
}
