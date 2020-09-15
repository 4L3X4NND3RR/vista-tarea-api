import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bill } from '../common/bill';
import { Message } from '../common/message';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  private baseUrl = 'http://localhost:3000/api/';

  constructor(private httpClient: HttpClient) { }

  createBill(bill: Bill): Observable<Message> {
    return this.httpClient.post<Message>(`${this.baseUrl}/facturas`, bill);
  }

  getBillByClient(id: number): Observable<Bill[]> {
    return this.httpClient.get<Bill[]>(`${this.baseUrl}/clientes/${id}/facturas`);
  }

  getBillByEmployee(id: number): Observable<Bill[]> {
    return this.httpClient.get<Bill[]>(`${this.baseUrl}/empleados/${id}/facturas`);
  }

  getBill(id: number): Observable<Bill> {
    return this.httpClient.get<Bill>(`${this.baseUrl}/facturas/${id}`);
  }

  updateBill(bill: Bill): Observable<Message> {
    return this.httpClient.put<Message>(`${this.baseUrl}/facturas/${bill.id}`, bill);
  }

  updateBillState(bill: Bill): Observable<Message> {
    return this.httpClient.patch<Message>(`${this.baseUrl}/facturas/${bill.id}`, bill);
  }

  deleteBill(id: number): Observable<Message> {
    return this.httpClient.delete<Message>(`${this.baseUrl}/facturas/${id}`);
  }
}
