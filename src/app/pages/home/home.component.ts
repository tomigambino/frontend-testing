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
  currentPage = 1;
  itemsPerPage = 8;
  currentQuantity = 1; // Cantidad del producto por defecto

  constructor(
    private apiService: ApiService
  ){}

  get productosPaginados(): ProductInterface[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.products.slice(startIndex, startIndex + this.itemsPerPage);
  }

  async ngOnInit() {
    // Inicializa las props extra sobre la lista original
    this.products = await this.apiService.getAllProducts()
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

  increment(): void {
    this.currentQuantity += 1;
  }

  decrement(): void {
    if(this.currentQuantity>1){
      this.currentQuantity -= 1;
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
