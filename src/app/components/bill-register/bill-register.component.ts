import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Bill } from 'src/app/common/bill';
import { BillService } from 'src/app/services/bill.service';

@Component({
  selector: 'app-bill-register',
  templateUrl: './bill-register.component.html',
  styleUrls: ['./bill-register.component.css']
})
export class BillRegisterComponent implements OnInit {
  form: FormGroup;
  stateControl = new FormControl();
  title: string = 'Editar factura';

  constructor(private billService: BillService, private formBuilder: FormBuilder, private snackBar: MatSnackBar, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: ['', Validators.required],
      cliente_id: ['', Validators.required],
      empleado_id: ['', Validators.required],
      creado: ['', Validators.required],
      estado: this.stateControl
    });
    this.fillFields();
  }

  fillFields() {
    if (this.route.snapshot.paramMap.has('id')) {
      const id: number = +this.route.snapshot.paramMap.get('id');
      this.billService.getBill(id).subscribe(
        data => {
          this.form.get('id').setValue(data[0].id);
          this.form.get('id').disable({ onlySelf: true });
          this.form.get('cliente_id').setValue(data[0].cliente_id);
          this.form.get('empleado_id').setValue(data[0].empleado_id);
          this.form.get('creado').setValue(data[0].creado);
          this.form.get('creado').disable({ onlySelf: true });
          this.form.get('estado').setValue(data[0].estado);
        }
      );
    }
  }

  onSubmit() {
    if (this.form.valid) {
      let bill: Bill = new Bill();
      bill.id =  this.form.get('id').value;
      bill.cliente_id = this.form.get('cliente_id').value;
      bill.empleado_id = this.form.get('empleado_id').value;
      bill.creado = this.getFormatDate();
      bill.estado = this.form.get('estado').value;
      this.billService.updateBill(bill).subscribe(
        data => {
          this.snackBar.open(data.mensaje, '', { duration: 3000 });
          this.router.navigate(['administracion/facturas']);
        },
        error => console.log(error)
      );
    }
  }

  private getFormatDate(): string {
    let fecha = new Date(this.form.get('creado').value);
    return `${fecha.getFullYear()}-${fecha.getMonth()}-${fecha.getDate()}`;
  }
}
