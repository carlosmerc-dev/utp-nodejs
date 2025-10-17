import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Api {
  private readonly baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  hello() {
    return this.http.get<{ message: string }>(`${this.baseUrl}/api/hello`);
  }

  todos() {
    return this.http.get<Array<{ id: number; title: string; done: boolean }>>(
      `${this.baseUrl}/api/todos`
    );
  }
}