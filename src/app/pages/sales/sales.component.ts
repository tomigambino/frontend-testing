import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaleInterface } from '../../interfaces/sale-interface';
import { ApiService } from '../../service/api.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
})
export class SalesComponent implements OnInit {

  sales: SaleInterface[] = [];
  total = 0;
  page = 1;
  pages: number[] = []; // Array de páginas
  limit = 5; // cantidad por página
  totalPages = 0;

  constructor(private apiService: ApiService) {}

  async ngOnInit() {
    await this.loadSales()
  }

  trackById = (_: number, item: SaleInterface) => item.id;

  async loadSales(): Promise<void> {
    const res = await this.apiService.getSales(this.page, this.limit);
    this.sales = res.data;
    this.total = res.total;
    this.totalPages = Math.ceil(this.total / this.limit);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.loadSales();
    }
  }
  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadSales();
    }
  }
  abrirModal() {
    const modal = document.getElementById('modalCliente');
    if (modal) {
      modal.style.display = 'flex'; // lo mostramos centrado
    }
  }

  cerrarModal() {
    const modal = document.getElementById('modalCliente');
    if (modal) {
    modal.style.display = 'none'; // lo ocultamos
    }
  }

}

