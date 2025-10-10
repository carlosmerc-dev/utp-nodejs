import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type Producto = { nombre: string; precio: number; creado:Date }

@Component({
  selector: 'app-productos',
  imports: [CommonModule],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})
export class Productos {
  productos : Producto[] = [
    { nombre: 'Teclado Mecánico', precio: 199.9, creado: new Date (2024, 5, 1)},
    { nombre: 'Mouse Inalámbrico', precio: 89.5, creado: new Date (2024, 9, 15)},
    { nombre: 'Monitor 27"', precio: 999.99, creado: new Date (2024, 0, 10)},
  ]

}
