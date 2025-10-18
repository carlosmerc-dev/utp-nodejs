import { Component, signal, Pipe, PipeTransform } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Pipe({
  name: 'uppercaseCustom',
  standalone: true
})
export class UppercaseCustomPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';
    return value.toUpperCase();
  }
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UppercaseCustomPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('cliente');
  protected readonly mensaje = signal('Hello World');
}
