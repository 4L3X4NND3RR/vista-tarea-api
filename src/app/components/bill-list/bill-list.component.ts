import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Bill } from 'src/app/common/bill';
import { BillService } from 'src/app/services/bill.service';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.css']
})
export class BillListComponent implements OnInit {
  called: boolean = true;
  listByControl = new FormControl('client');
  options: FormGroup;
  bills: Bill[] = [];
  displayedColumns: string[] = ['id', 'cliente_id', 'empleado_id', 'creado', 'estado', 'detail', 'edit', 'delete', 'star'];

  constructor(private billService: BillService, private formBuilder: FormBuilder, private snackBar: MatSnackBar, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const routeComponent = this.router.url.split('/');
    if (routeComponent[2] === 'bill-client') {
      this.called = false;
      if (this.route.snapshot.paramMap.has('id')) {
        this.listByClient(+this.route.snapshot.paramMap.get('id'));
      }
    } else if (routeComponent[2] === 'bill-employee') {
      this.called = false;
      if (this.route.snapshot.paramMap.has('id')) {
        this.listByEmployee(+this.route.snapshot.paramMap.get('id'));
      }
    } else {
      this.options = this.formBuilder.group({
        listBy: this.listByControl,
        id: ['', Validators.required]
      });
    }
  }
  listByEmployee(id: number) {
    this.billService.getBillByEmployee(id).subscribe(
      data => this.bills = data,
      error => console.log(error)
    );
  }

  listByClient(id: number) {
    this.billService.getBillByClient(id).subscribe(
      data => this.bills = data,
      error => console.log(error)
    );
  }

  onDelete(id: number) {
    this.billService.deleteBill(id).subscribe(
      data => {
        this.snackBar.open(data.mensaje, '', { duration: 3000 }),
          error => console.log(error);
      }
    );
  }

  onListBill() {
    if (this.options.valid) {
      if (this.options.get('listBy').value == 'client') {
        this.listByClient(this.options.get('id').value);
      } else if (this.options.get('listBy').value == 'employee') {
        this.listByEmployee(this.options.get('id').value);
      }
    }
  }
}
