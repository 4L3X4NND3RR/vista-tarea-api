import { HttpClientModule } from '@angular/common/http';
import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, HttpClientModule, RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('click should invoke onSubmit', fakeAsync(() => {
    spyOn(component, 'onSubmit');
    let btn = fixture.debugElement.nativeElement.querySelector('button');
    btn.click();
    tick();
    expect(component.onSubmit).toHaveBeenCalled();
  }));

  it('should detect form is valid', () => {
    component.onSubmit();
    expect(component.form.invalid).toEqual(true);
  });

  it('onSubmit should be correct', async function () {
    component.form.controls['username'].setValue('admin');
    component.form.controls['password'].setValue('admin');
    await component.onSubmit();
    expect(component.token.mensaje).toEqual('Autenticación correcta');
  });
});
