import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillDetailComponent } from './components/bill-detail/bill-detail.component';
import { BillListComponent } from './components/bill-list/bill-list.component';
import { BillRegisterComponent } from './components/bill-register/bill-register.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { ClientRegisterComponent } from './components/client-register/client-register.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeRegisterComponent } from './components/employee-register/employee-register.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductRegisterComponent } from './components/product-register/product-register.component';
import { AuthGuard } from './config/auth.guard';


const routes: Routes = [
  {
    path: 'administracion', component: MainMenuComponent, children: [
      { path: 'inicio', component: HomeComponent },
      { path: 'productos', component: ProductListComponent },
      { path: 'add-product', component: ProductRegisterComponent },
      { path: 'edit-product/:id', component: ProductRegisterComponent },
      { path: 'clientes', component: ClientListComponent },
      { path: 'add-client', component: ClientRegisterComponent },
      { path: 'edit-client/:id', component: ClientRegisterComponent },
      { path: 'bill-client/:id', component: BillListComponent },
      { path: 'empleados', component: EmployeeListComponent },
      { path: 'add-employee', component: EmployeeRegisterComponent },
      { path: 'edit-employee/:id', component: EmployeeRegisterComponent },
      { path: 'edit-bill/:id', component: BillRegisterComponent },
      { path: 'bill-employee/:id', component: BillListComponent },
      { path: 'facturas', component: BillListComponent },
      { path: 'bill-detail/:id', component: BillDetailComponent },
      { path: '', component: HomeComponent }
    ], canActivate: [AuthGuard]
  },
  { path: 'login' , component: LoginComponent },
  { path: '', redirectTo: '/administracion', pathMatch: 'full' },
  { path: '**', redirectTo: '/administracion', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
