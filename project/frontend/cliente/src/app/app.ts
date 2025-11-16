import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './app.html',
})
export class App implements OnInit {
  msg?: string;
  message = "Hello world"

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getHello().subscribe({
      next: data => this.msg = data.message,
      error: err => this.msg = 'Hola mundo'
    });
  }

  users = [
    { name: 'Ana', email: 'ana@utp.edu', active: true },
    { name: 'Luis', email: 'luis@utp.edu', active: false },
    { name: 'Ana', email: 'ana@utp.edu', active: true },
    { name: 'Luis', email: 'luis@utp.edu', active: false },
    { name: 'Ana', email: 'ana@utp.edu', active: true },
    { name: 'Luis', email: 'luis@utp.edu', active: false }
  ];
}