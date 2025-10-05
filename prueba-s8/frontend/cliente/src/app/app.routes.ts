import { Routes } from '@angular/router';
// Agregar componente
import { Menu } from './menu/menu';
import { Saludo } from './saludo/saludo';

export const routes: Routes = [
    // Agregar componente
    { path: '', redirectTo: 'menu', pathMatch: 'full' },
    { path: 'menu', component: Menu },
    { path: 'saludo', component: Saludo },
];
