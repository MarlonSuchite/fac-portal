import { Component } from '@angular/core';

@Component({
  selector: 'app-process',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent {
  productos: any[] = []; // Arreglo para almacenar los productos

  agregarProducto() {
    // Lógica para agregar un producto a la lista de productos
  }

  calcularTotal() {
    // Lógica para calcular el total
  }

  calcularImpuestos() {
    // Lógica para calcular impuestos
  }
}
