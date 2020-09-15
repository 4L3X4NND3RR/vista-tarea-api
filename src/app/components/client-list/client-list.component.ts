import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Client } from 'src/app/common/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'direccion', 'nit', 'creado_por', 'bills', 'edit', 'delete', 'star'];
  clients: Client[] = [];

  constructor(private clientService: ClientService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.listClient();
  }

  listClient() {
    this.clientService.getClients().subscribe(
      data => this.clients = data,
      error => console.log(error)
    );
  }

  onDelete(id: number) {
    this.clientService.deleteClient(id).subscribe(
      data => {
        this.snackBar.open(data.mensaje, '', { duration: 3000 });
        this.listClient();
      },
      error => console.log(error)
    );
  }
}
