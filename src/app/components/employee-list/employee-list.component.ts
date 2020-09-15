import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee } from 'src/app/common/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'codigo', 'salario', 'creado_por', 'bills', 'edit', 'delete', 'star'];
  employees: Employee[] = [];

  constructor(private employeeServie: EmployeeService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.listEmployee();
  }

  listEmployee() {
    this.employeeServie.getEmployees().subscribe(
      data => this.employees = data,
      error => console.log(error)
    );
  }

  onDelete(id: number) {
    this.employeeServie.deleteEmploye(id).subscribe(
      data => {
        this.snackBar.open(data.mensaje, '', {duration: 3000});
        this.listEmployee();
      },
      error => console.log(error)
    );
  }
}
