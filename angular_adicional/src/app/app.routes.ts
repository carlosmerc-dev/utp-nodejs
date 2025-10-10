import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Productos } from './pages/productos/productos';
import { Formulario } from './pages/formulario/formulario';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home, title: 'Inicio' },
  { path: 'productos', component: Productos, title: 'Productos' },
  { path: 'formulario', component: Formulario, title: 'Formulario' },
  { path: '**', redirectTo: 'home' }
];