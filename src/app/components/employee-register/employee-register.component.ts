import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/common/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.component.html',
  styleUrls: ['./employee-register.component.css']
})
export class EmployeeRegisterComponent implements OnInit {
  title: string;
  action: string;
  form: FormGroup;
  
  constructor(private employeeService: EmployeeService, private formBuilder: FormBuilder, private snackBar: MatSnackBar, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const routeComponent = this.router.url.split('/');
    if (routeComponent[2] === 'add-employee') {
      this.title = 'Crear empleado';
      this.action = 'add'
      this.form = this.formBuilder.group({
        nombre: ['', Validators.required],
        codigo: ['', Validators.required],
        salario: ['', Validators.required],
        creado_por: ['', Validators.required]
      });
    } else if (routeComponent[2] === 'edit-employee') {
      this.title = 'Editar empleado';
      this.action = 'edit';
      this.form = this.formBuilder.group({
        id: ['', Validators.required],
        nombre: ['', Validators.required],
        codigo: ['', Validators.required],
        salario: ['', Validators.required],
        creado_por: ['', Validators.required]
      });
      this.fillFields();
    }
  }

  fillFields() {
    if (this.route.snapshot.paramMap.has('id')) {
      const id: number = +this.route.snapshot.paramMap.get('id');
      this.employeeService.getEmployee(id).subscribe(
        data => {
          this.form.get('id').setValue(data[0].id);
          this.form.get('id').disable({ onlySelf: true });
          this.form.get('nombre').setValue(data[0].nombre);
          this.form.get('codigo').setValue(data[0].codigo);
          this.form.get('salario').setValue(data[0].salario);
          this.form.get('creado_por').setValue(data[0].creado_por);
        }
      );
    }
  }

  onSubmit() {
    if (this.form.valid) {
      let employee: Employee = new Employee();
      employee.nombre = this.form.get('nombre').value;
      employee.codigo = this.form.get('codigo').value;
      employee.salario = this.form.get('salario').value;
      employee.creado_por = this.form.get('creado_por').value;
      if (this.action == 'edit') {
        employee.id = this.form.get('id').value;
        this.employeeService.updateEmployee(employee).subscribe(
          data => {
            this.snackBar.open(data.mensaje, '', { duration: 3000 });
            this.router.navigate(['administracion/empleados']);
          }, error => console.log(error)
        );
      } else if (this.action == 'add') {
        this.employeeService.createEmployee(employee).subscribe(
          data => {
            this.snackBar.open(data.mensaje, '', { duration: 3000 });
            this.router.navigate(['administracion/empleados']);
          }, error => console.log(error)
        );
      }
    }
  }
}
