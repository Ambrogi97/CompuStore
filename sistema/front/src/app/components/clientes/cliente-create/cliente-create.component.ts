import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/Cliente';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css'],
})
export class ClienteCreateComponent implements OnInit {
  public clientes: any;
  public success_message: string;

  constructor(
    private _ClientService: ClientService,
    private router: Router
  ) {
    this.clientes = new Client('', '', '', '', '', 1, '', 1, '');
  }

  //Metodo registrar cliente
  onSubmit(clienteForm: any) {
    if (clienteForm.valid) {
      this._ClientService
        .insert_cliente({
          nombre: clienteForm.value.nombre,
          apellido: clienteForm.value.apellido,
          email: clienteForm.value.email,
          direccion: clienteForm.value.direccion,
          telefono: clienteForm.value.telefono,
          ciudad: clienteForm.value.ciudad,
          codigopostal: clienteForm.value.codigopostal,
          pais: clienteForm.value.pais,
        })
        .subscribe(
          (response) => {
            console.log(response);
            this.success_message = 'Producto registrado';
            this.router.navigate(['/clientes'])
          },
          (error) => { }
        );
    }
  }
  ngOnInit(): void { }
}
