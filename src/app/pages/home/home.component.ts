import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  products = [
    { id: 1, nombre: 'Botin', precio: 1500, imagen: 'assets/img/messi.jpg' },
    { id: 2, nombre: 'Pelota', precio: 2000, imagen: 'assets/img/pelota.jpg' },
    { id: 3, nombre: 'Remera', precio: 2500, imagen: 'assets/img/zanetti.webp' },
    // ...más productos
  ];

  currentPage = 1;
  itemsPerPage = 8;

  get productosPaginados() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.products.slice(startIndex, startIndex + this.itemsPerPage);
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }
}
