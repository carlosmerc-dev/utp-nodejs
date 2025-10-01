import { Routes } from '@angular/router';

import { Declarativo } from './declarativo/declarativo';
import { Saludo } from './saludo/saludo';

export const routes: Routes = [
  { path: '', redirectTo: 'declarativo', pathMatch: 'full' },
  { path: 'declarativo', component: Declarativo, title: 'Demo Declarativo vs Imperativo' },
  { path: 'saludo', component: Saludo, title: 'Componente Saludo' }
];
