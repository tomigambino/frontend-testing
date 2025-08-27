import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  mostrarPanel?: boolean;
  cantidad?: number;
  mostrandoMensaje?: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // ojo: era styleUrl en singular, corregido a styleUrls
})
export class HomeComponent implements OnInit {

  products: Producto[] = [
    { id: 1, nombre: 'Botin', precio: 1500, imagen: 'assets/img/messi.jpg', mostrarPanel: false },
    { id: 2, nombre: 'Pelota', precio: 2000, imagen: 'assets/img/pelota.jpg', mostrarPanel: false },
    { id: 3, nombre: 'Remera', precio: 2500, imagen: 'assets/img/zanetti.webp', mostrarPanel: false },
  ];

  currentPage = 1;
  itemsPerPage = 8;

  get productosPaginados(): Producto[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.products.slice(startIndex, startIndex + this.itemsPerPage);
  }

  ngOnInit(): void {
    // Inicializa las props extra sobre la lista original
    this.products.forEach(p => {
      p.cantidad = 1;
      p.mostrandoMensaje = false;
    });
  }

  getTotalPaginas(): number[] {
    if (!this.products.length) return [];
    const total = Math.ceil(this.products.length / this.itemsPerPage);
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

  paginaAnterior(): void {
    if (this.currentPage > 1) this.currentPage--;
  }

  paginaSiguiente(): void {
    if (this.currentPage < this.getTotalPaginas().length) this.currentPage++;
  }

  increment(item: Producto): void {
    item.cantidad = (item.cantidad || 1) + 1;
  }

  decrement(item: Producto): void {
    const next = (item.cantidad || 1) - 1;
    item.cantidad = next < 1 ? 1 : next;
  }

  confirmarCarrito(item: Producto): void {
    console.log(`Agregaste ${item.cantidad} unidad(es) de ${item.nombre}`);
    item.mostrandoMensaje = true;
    setTimeout(() => item.mostrandoMensaje = false, 2000);
    // Aquí tu lógica real de añadir al carrito
  }
}
