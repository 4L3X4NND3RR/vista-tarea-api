import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/common/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.css']
})
export class ClientRegisterComponent implements OnInit {
  action: string;
  title: string;
  form: FormGroup;

  constructor(private clientService: ClientService, private formBuilder: FormBuilder, private snackBar: MatSnackBar, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const routeComponent = this.router.url.split('/');
    if (routeComponent[2] === 'add-client') {
      this.title = 'Crear cliente';
      this.action = 'add'
      this.form = this.formBuilder.group({
        nombre: ['', Validators.required],
        direccion: ['', Validators.required],
        nit: ['', Validators.required],
        creado_por: ['', Validators.required]
      });
    } else if (routeComponent[2] === 'edit-client') {
      this.title = 'Editar cliente';
      this.action = 'edit';
      this.form = this.formBuilder.group({
        id: ['', Validators.required],
        nombre: ['', Validators.required],
        direccion: ['', Validators.required],
        nit: ['', Validators.required],
        creado_por: ['', Validators.required]
      });
      this.fillFields();
    }
  }

  fillFields() {
    if (this.route.snapshot.paramMap.has('id')) {
      const id: number = +this.route.snapshot.paramMap.get('id');
      this.clientService.getClient(id).subscribe(
        data => {
          this.form.get('id').setValue(data[0].id);
          this.form.get('id').disable({ onlySelf: true });
          this.form.get('nombre').setValue(data[0].nombre);
          this.form.get('direccion').setValue(data[0].direccion);
          this.form.get('nit').setValue(data[0].nit);
          this.form.get('creado_por').setValue(data[0].creado_por);
        }
      );
    }
  }

  onSubmit() {
    if (this.form.valid) {
      let client: Client = new Client();
      client.nombre = this.form.get('nombre').value;
      client.direccion = this.form.get('direccion').value;
      client.nit = this.form.get('nit').value;
      client.creado_por = this.form.get('creado_por').value;
      if (this.action == 'edit') {
        client.id = this.form.get('id').value;
        this.clientService.updateClient(client).subscribe(
          data => {
            this.snackBar.open(data.mensaje, '', { duration: 3000 });
            this.router.navigate(['administracion/clientes']);
          }, error => console.log(error)
        );
      } else if (this.action == 'add') {
        this.clientService.createClient(client).subscribe(
          data => {
            this.snackBar.open(data.mensaje, '', { duration: 3000 });
            this.router.navigate(['administracion/clientes']);
          }, error => console.log(error)
        );
      }
    }
  }
}
