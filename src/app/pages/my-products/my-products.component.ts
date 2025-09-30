import { Component, OnInit } from "@angular/core";
import { AppComponent } from "../../app.component";
import { ProductTypeInterface } from "../../interfaces/productType-interface";
import { ProductInterface } from "../../interfaces/product-interface";
import { ApiService } from "../../service/api.service";
import { RouterModule } from '@angular/router';
import { CustomerInterface } from "../../interfaces/customer-interface";
import { SaleInterface } from "../../interfaces/sale-interface";


@Component({
    imports: [RouterModule],
    selector: 'App-product',
    templateUrl: './my-products.component.html',
    styleUrls: ['./my-products.component.css']
})
export class MyProductComponent implements OnInit {
  total = 0;
  page = 1;
  pages: number[] = []; // Array de páginas
  limit = 5; // cantidad por página
  totalPages = 0;
  isModalOpen = false;
  customer: CustomerInterface | null = null

  constructor(private apiService: ApiService) {}

  async ngOnInit() {
    await this.loadSales()
  }

  trackById = (_: number, item: SaleInterface) => item.id;

  async loadSales(): Promise<void> {;
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

  openModal(customer: CustomerInterface): void {
    console.log(customer)
    this.customer = customer;
    this.isModalOpen = true;
    console.log(this.isModalOpen)
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.customer = null;
  }


}