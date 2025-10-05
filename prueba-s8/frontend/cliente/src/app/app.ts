import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// Importa tu componente
import { Saludo } from './saludo/saludo'; 
// Importa las directivas de router
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
   // Agrega el componente y las directivas de router
  imports: [CommonModule, Saludo, RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  // Datos de ejemplo
  numbers: number[] = [1, 2, 3, 4, 5];

  // Resultado IMPERATIVO (se actualiza manualmente)
  imperativeSum = 0;

  // Fragmento de código que mostraremos tal cual en la vista
  imperativeSnippet = `let sum = 0;
for (let i = 0; i < numbers.length; i++) {
  sum += numbers[i];
}`;

  // Getter DECLARATIVO (la vista solo declara qué mostrar)
  get declarativeSum(): number {
    return this.numbers.reduce((acc, n) => acc + n, 0);
  }

  ngOnInit(): void {
    this.recalculateImperative();
  }

  private recalculateImperative(): void {
    let sum = 0;
    for (let i = 0; i < this.numbers.length; i++) {
      sum += this.numbers[i];
    }
    this.imperativeSum = sum;
  }

  addNumber(): void {
    const next = (this.numbers[this.numbers.length - 1] ?? 0) + 1;
    this.numbers = [...this.numbers, next];
    this.recalculateImperative();
  }

  shuffle(): void {
    this.numbers = [...this.numbers].sort(() => Math.random() - 0.5);
    this.recalculateImperative();
  }

  reset(): void {
    this.numbers = [1, 2, 3, 4, 5];
    this.recalculateImperative();
  }
}
