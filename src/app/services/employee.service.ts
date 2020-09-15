import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../common/employee';
import { Message } from '../common/message';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'http://localhost:3000/api/empleados';

  constructor(private httpClient: HttpClient) { }

  createEmployee(employee: Employee): Observable<Message> {
    return this.httpClient.post<Message>(this.baseUrl, employee);
  }

  getEmployee(id: number): Observable<Employee> {
    return this.httpClient.get<Employee>(`${this.baseUrl}/${id}`);
  }

  getEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.baseUrl);
  }

  updateEmployee(employe: Employee): Observable<Message> {
    return this.httpClient.put<Message>(`${this.baseUrl}/${employe.id}`, employe);
  }

  deleteEmploye(id: number): Observable<Message> {
    return this.httpClient.delete<Message>(`${this.baseUrl}/${id}`);
  }
}
