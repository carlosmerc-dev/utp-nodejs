import { Component } from '@angular/core';

@Component({
  selector: 'app-saludo',
  standalone: true,
  imports: [],
  templateUrl: './saludo.html',
  styleUrl: './saludo.css'
})
export class Saludo {
  nombre = 'UTP';
}
