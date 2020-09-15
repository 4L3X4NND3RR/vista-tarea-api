import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BillDetail } from '../common/bill-detail';
import { Message } from '../common/message';

@Injectable({
  providedIn: 'root'
})
export class BillDetailService {

  private baseUrl = 'http://localhost:3000/api/facturas';

  constructor(private httpClient: HttpClient) { }

  createBillDetail(billDetail: BillDetail, idFactura: number): Observable<Message> {
    return this.httpClient.post<Message>(`${this.baseUrl}/${idFactura}/detalle`, billDetail);
  } 

  getBillDetail(idFactura: number): Observable<BillDetail[]> {
    return this.httpClient.get<BillDetail[]>(`${this.baseUrl}/${idFactura}/productos`);
  }

  deleteBillDetail(idFactura: number, idProduct: number): Observable<Message> {
    return this.httpClient.delete<Message>(`${this.baseUrl}/${idFactura}/detalle?id_producto=${idProduct}`);
  }
}
