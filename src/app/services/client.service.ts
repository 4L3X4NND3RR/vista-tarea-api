import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../common/client';
import { Message } from '../common/message';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseUrl: string = 'http://localhost:3000/api/clientes';

  constructor(private httpClient: HttpClient) { }

  createClient(client: Client): Observable<Message> {
    return this.httpClient.post<Message>(this.baseUrl, client);
  }

  getClient(id: number): Observable<Client> {
    return this.httpClient.get<Client>(`${this.baseUrl}/${id}`);
  }

  getClients(): Observable<Client[]> {
    return this.httpClient.get<Client[]>(this.baseUrl);
  }

  updateClient(client: Client): Observable<Message> {
    return this.httpClient.put<Message>(`${this.baseUrl}/${client.id}`, client);
  }

  deleteClient(id: number): Observable<Message> {
    return this.httpClient.delete<Message>(`${this.baseUrl}/${id}`);
  }
}
