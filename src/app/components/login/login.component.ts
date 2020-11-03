import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Token } from 'src/app/common/token';
import { User } from 'src/app/common/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loginInvalid: boolean;
  token: Token;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async onSubmit() {
    this.loginInvalid = false;
    if (this.form.valid) {
      try {
        const nombre = this.form.get('username').value;
        const password = this.form.get('password').value;
        const user: User = { nombre, password };
        this.token = await this.loginService.login(user).toPromise();
        console.log(this.token);
        if (this.token.mensaje == 'Autenticación correcta') {
          localStorage.setItem('auth_token', this.token.token);
          this.router.navigateByUrl('/administracion');
        } else {
          this.loginInvalid = true;
        }
      } catch (err) {
        this.loginInvalid = true;
      }
    }
  }
}
