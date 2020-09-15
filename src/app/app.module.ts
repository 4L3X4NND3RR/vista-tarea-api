import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';

// ---------MIDDLEWARE----------
import { AuthInterceptor } from './config/auth.interceptor';

// ---------COMPONENTS----------
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { LoginComponent } from './components/login/login.component';
import { ProductRegisterComponent } from './components/product-register/product-register.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { ClientRegisterComponent } from './components/client-register/client-register.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeRegisterComponent } from './components/employee-register/employee-register.component';
import { BillListComponent } from './components/bill-list/bill-list.component';
import { BillRegisterComponent } from './components/bill-register/bill-register.component';

// ---------ANGULAR MATERIAL-----------
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from './components/home/home.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { BillDetailComponent } from './components/bill-detail/bill-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    HomeComponent,
    ProductListComponent,
    LoginComponent,
    ProductRegisterComponent,
    ClientListComponent,
    ClientRegisterComponent,
    EmployeeListComponent,
    EmployeeRegisterComponent,
    BillListComponent,
    BillRegisterComponent,
    BillDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
