import { Component, OnInit } from "@angular/core";
import { AppComponent } from "../../app.component";
import { ProductTypeInterface } from "../../interfaces/productType-interface";
import { ProductInterface } from "../../interfaces/product-interface";
import { ApiService } from "../../service/api.service";
import { RouterModule } from '@angular/router';


@Component({
    imports: [RouterModule],
    selector: 'App-product',
    templateUrl: './my-products.component.html',
    styleUrls: ['./my-products.component.css']
})
export class MyProductComponent implements OnInit {
    products: ProductInterface[] = []
    productTypes: ProductTypeInterface[] = [];
    selectedTypeId: number | null = null;
    menuOpen = false;
    total = 0;
    page = 1;
    pages: number[] = []; // Array de páginas
    limit = 6; // cantidad por página
    totalPages = 0;
    modalAbierto = false;

    
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
   
  abrirModal() {
    this.modalAbierto = true;
  }

  cerrarModal() {
    this.modalAbierto = false;
  }


}