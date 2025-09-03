import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

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
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // ojo: era styleUrl en singular, corregido a styleUrls
})
export class HomeComponent implements OnInit {

  products: Producto[] = [
    { id: 1, nombre: 'Botines de Messi x Adidas 2024', precio: 1500, imagen: 'assets/img/messi.jpg', mostrarPanel: false },
    { id: 2, nombre: 'Pelota UEFA Champions League 2024', precio: 2000, imagen: 'assets/img/pelota.jpg', mostrarPanel: false },
    { id: 3, nombre: 'Remera Zanetti #23 Inter de Milan 2010', precio: 2500, imagen: 'assets/img/zanetti.webp', mostrarPanel: false },
  ];

  currentPage = 1;
  itemsPerPage = 8;
  private closeTimeout: any;

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

    // Está abierto y lo cerramos luego de confirmar con un retardo
    if (item.mostrarPanel) {
      this.closeTimeout = setTimeout(() => {
        item.mostrarPanel = false;
      }, 1000); // 2 segundos de delay para cerrar
    } else {
      // Abrir inmediatamente
      clearTimeout(this.closeTimeout);
      item.mostrarPanel = true;
    }
  }

  // Alterna el panel del producto clickeado
  togglePanel(item: any) {
  item.mostrarPanel = !item.mostrarPanel;
  }

}
