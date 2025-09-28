import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductInterface } from '../../interfaces/product-interface';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // ojo: era styleUrl en singular, corregido a styleUrls
})
export class HomeComponent implements OnInit {

  products: ProductInterface[] = []
  total = 0;
  page = 1;
  pages: number[] = []; // Array de páginas
  limit = 5; // cantidad por página
  totalPages = 0;

  constructor(
    private apiService: ApiService
  ){}

  async ngOnInit() {
    await this.loadProducts();
  }

  async loadProducts(): Promise<void> {
    const res = await this.apiService.getProducts(this.page, this.limit);
    this.products = res.data;
    this.total = res.total;
    this.totalPages = Math.ceil(this.total / this.limit);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.loadProducts();
    }
  }
  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadProducts();
    }
  }

  /*confirmarCarrito(item: ProductInterface): void {
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
  */
}
