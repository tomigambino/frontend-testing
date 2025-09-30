import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductInterface } from '../../interfaces/product-interface';
import { ApiService } from '../../service/api.service';
import { ProductTypeInterface } from '../../interfaces/productType-interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // ojo: era styleUrl en singular, corregido a styleUrls
})
export class HomeComponent implements OnInit {

  products: ProductInterface[] = []
  productTypes: ProductTypeInterface[] = [];
  selectedTypeId: number | null = null;
  menuOpen = false;
  total = 0;
  page = 1;
  pages: number[] = []; // Array de páginas
  limit = 6; // cantidad por página
  totalPages = 0;

  constructor(
    private apiService: ApiService
  ){}

  async ngOnInit() {
    await this.loadProducts();
    await this.loadProductTypes();
  }

  async loadProducts(): Promise<void> {
    const res = await this.apiService.getProducts(this.page, this.limit);
    this.products = res.data;
    this.total = res.total;
    this.totalPages = Math.ceil(this.total / this.limit);
    // Creamos una lista con los números de página
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  async loadProductTypes(): Promise<void> {
    const res = await this.apiService.getProductTypes();
    this.productTypes = res;
  }

  async filterByType(typeId: number): Promise<void> {
    // En caso de que se vuelva a seleccionar el mismo tipo de producto, se mostraran todos los productos
    if(this.selectedTypeId === typeId){
      this.loadProducts()
      this.selectedTypeId = null
      return
    }
    this.selectedTypeId = typeId;
    const res = await this.apiService.getAllProductByProductType(typeId, this.page, this.limit);
    this.products = res.data;
    this.total = res.total;
    this.totalPages = Math.ceil(this.total / this.limit);
    // Creamos una lista con los números de página
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

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

}
