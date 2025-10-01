import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-declarativo',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './declarativo.html',
  styleUrl: './declarativo.css'
})
export class Declarativo implements OnInit {
  numbers: number[] = [1, 2, 3, 4, 5];
  imperativeSum = 0;

  // Bloque que se muestra tal cual
  imperativeSnippet = `let sum = 0;
for (let i = 0; i < numbers.length; i++) {
  sum += numbers[i];
}`;

  // Declarativo: la vista solo pide este valor
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
