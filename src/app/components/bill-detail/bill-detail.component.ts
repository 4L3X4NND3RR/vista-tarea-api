import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { BillDetail } from 'src/app/common/bill-detail';
import { BillDetailService } from 'src/app/services/bill-detail.service';

@Component({
  selector: 'app-bill-detail',
  templateUrl: './bill-detail.component.html',
  styleUrls: ['./bill-detail.component.css']
})
export class BillDetailComponent implements OnInit {

  billDetails: BillDetail[] = [];
  displayedColumns: string[] = ['id', 'cliente_id', 'empleado_id', 'producto_id', 'nombre', 'precio', 'cantidad', 'subtotal', 'delete', 'star'];

  constructor(private billDetailService: BillDetailService,private snackBar: MatSnackBar, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.listBillDetail();
  }

  listBillDetail() {
    if (this.route.snapshot.paramMap.has('id')) {
      this.billDetailService.getBillDetail(+this.route.snapshot.paramMap.get('id')).subscribe(
        data => this.billDetails = data,
        error => console.log(error)
      );
    }
  }

  onDelete(id: number) {
    if (this.route.snapshot.paramMap.has('id')) {
      this.billDetailService.deleteBillDetail(+this.route.snapshot.paramMap.get('id'), id).subscribe(
        data => {
          this.snackBar.open(data.mensaje, '', { duration: 3000 });
          this.listBillDetail();
        },
        error => console.log(error)
      );
    }
  }
}
