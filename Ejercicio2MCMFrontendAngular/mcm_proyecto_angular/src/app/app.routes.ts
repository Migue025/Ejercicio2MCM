// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'producto',
    loadComponent: () => import('./producto.component').then(m => m.ProductoComponent)
  },
  { path: '', redirectTo: 'producto', pathMatch: 'full' },
  { path: '**', redirectTo: 'producto' }
];
