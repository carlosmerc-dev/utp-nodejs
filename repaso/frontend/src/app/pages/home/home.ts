import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Api } from '../../services/api';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  msg = 'Cargando...';
  todos: Array<{ id: number; title: string; done: boolean }> = [];
  error = '';

  constructor(private api: Api) {}

  ngOnInit(): void {
    this.api.hello().subscribe({
      next: (data) => (this.msg = data.message),
      error: () => (this.msg = 'Error conectando al backend')
    });

    this.api.todos().subscribe({
      next: (data) => (this.todos = data),
      error: (err) => (this.error = err.message ?? 'Error cargando todos')
    });
  }
}
