// src/app/producto.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

export interface Producto {
  id?: number;
  nombre: string;
  descripcion: string;
  precio: number;
}

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <h2>Gestión de Productos</h2>

    <!-- Formulario para crear un nuevo producto -->
    <form #productoForm="ngForm" (ngSubmit)="crearProducto()">
      <div>
        <label>Nombre:</label>
        <input type="text" name="nombre" [(ngModel)]="nuevoProducto.nombre" required>
      </div>
      <div>
        <label>Descripción:</label>
        <input type="text" name="descripcion" [(ngModel)]="nuevoProducto.descripcion" required>
      </div>
      <div>
        <label>Precio:</label>
        <input type="number" name="precio" [(ngModel)]="nuevoProducto.precio" required>
      </div>
      <button type="submit">Crear Producto</button>
    </form>

    <hr>

    <!-- Lista de productos -->
    <h3>Lista de Productos</h3>
    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Precio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let p of productos">
          <td>{{ p.id }}</td>
          <td>{{ p.nombre }}</td>
          <td>{{ p.descripcion }}</td>
          <td>{{ p.precio }}</td>
          <td>
            <button (click)="editarProducto(p)">Editar</button>
            <button (click)="eliminarProducto(p.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Formulario para editar un producto -->
    <div *ngIf="productoEdit">
      <h3>Editar Producto</h3>
      <form #editForm="ngForm" (ngSubmit)="actualizarProducto()">
        <div>
          <label>Nombre:</label>
          <input type="text" name="nombre" [(ngModel)]="productoEdit.nombre" required>
        </div>
        <div>
          <label>Descripción:</label>
          <input type="text" name="descripcion" [(ngModel)]="productoEdit.descripcion" required>
        </div>
        <div>
          <label>Precio:</label>
          <input type="number" name="precio" [(ngModel)]="productoEdit.precio" required>
        </div>
        <button type="submit">Actualizar Producto</button>
        <button type="button" (click)="cancelarEdicion()">Cancelar</button>
      </form>
    </div>
  `
})
export class ProductoComponent implements OnInit {
  productos: Producto[] = [];
  nuevoProducto: Producto = { nombre: '', descripcion: '', precio: 0 };
  productoEdit: Producto | null = null;
  // Ajusta esta URL si tu backend está en otro host/puerto
  private apiUrl = 'http://localhost:8080/api/productos';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.http.get<Producto[]>(this.apiUrl).subscribe({
      next: data => this.productos = data,
      error: err => console.error('Error al cargar productos:', err)
    });
  }

  crearProducto(): void {
    this.http.post<Producto>(this.apiUrl, this.nuevoProducto).subscribe({
      next: data => {
        this.productos.push(data);
        this.nuevoProducto = { nombre: '', descripcion: '', precio: 0 };
      },
      error: err => console.error('Error al crear producto:', err)
    });
  }

  editarProducto(producto: Producto): void {
    this.productoEdit = { ...producto };
  }

  actualizarProducto(): void {
    if (this.productoEdit && this.productoEdit.id) {
      const url = `${this.apiUrl}/${this.productoEdit.id}`;
      this.http.put<Producto>(url, this.productoEdit).subscribe({
        next: data => {
          const index = this.productos.findIndex(p => p.id === data.id);
          if (index > -1) {
            this.productos[index] = data;
          }
          this.productoEdit = null;
        },
        error: err => console.error('Error al actualizar producto:', err)
      });
    }
  }

  eliminarProducto(id?: number): void {
    if (id) {
      const url = `${this.apiUrl}/${id}`;
      this.http.delete(url).subscribe({
        next: () => {
          this.productos = this.productos.filter(p => p.id !== id);
        },
        error: err => console.error('Error al eliminar producto:', err)
      });
    }
  }

  cancelarEdicion(): void {
    this.productoEdit = null;
  }
}
