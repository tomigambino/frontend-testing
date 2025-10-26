import { Component, OnInit } from "@angular/core";
import { AppComponent } from "../../app.component";
import { ProductTypeInterface } from "../../interfaces/productType-interface";
import { ProductInterface } from "../../interfaces/product-interface";
import { ApiService } from "../../service/api.service";
import { RouterModule } from '@angular/router';
import { CustomerInterface } from "../../interfaces/customer-interface";
import { SaleInterface } from "../../interfaces/sale-interface";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";


@Component({
    imports: [RouterModule, CommonModule, FormsModule],
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
  menuOpen = false;
  addMenu = false;
  editMenu = false;
  customer: CustomerInterface | null = null
  products: ProductInterface[] = []
  productTypes: ProductTypeInterface[] = [];
  selectedTypeId: number | null = null;
  selectedFiles: File[] = [];
  http: any;
  newProduct: ProductInterface = {
  id: 0,
  productType: { id: 0, name: '' }, // o solo el id si tu backend lo espera
  name: '',
  description: '',
  price: 0,
  stock: 0,
  isActive: true,
  images: []
  };


  constructor(private apiService: ApiService) {}

  async ngOnInit() {
    await this.loadProducts();
    await this.loadProductTypes();
  }

  trackById = (_: number, item: SaleInterface) => item.id;


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

  onFileSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files);
  }

  async onSubmit() {
    const payload = {
      name: this.newProduct.name,
      description: this.newProduct.description,
      price: this.newProduct.price,
      stock: this.newProduct.stock,
      isActive: true, // siempre activo
      productTypeId: this.selectedTypeId 
    };

    console.log('Enviando producto:', payload);

    try {
      const res = await this.apiService.createProduct(payload);
      console.log('Producto agregado:', res);

      this.cerrarAddProduct();
      await this.loadProducts();

      // limpiar formulario
      this.newProduct = {
        id: 0,
        productType: { id: 0, name: '' },
        name: '',
        description: '',
        price: 0,
        stock: 0,
        isActive: true,
        images: []
      };
      this.selectedTypeId = null;
    } catch (err: any) {
      console.error('Error al crear producto:', err?.response?.data || err);
    }
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
    this.menuOpen = true
  }

  cerrarToggleMenu() {
    this.menuOpen = false
  }

  addProduct() {
    this.addMenu = true
  }

  cerrarAddProduct() {
    this.addMenu = false
  }

  editProduct() {
    this.editMenu = true
  }

  cerrarEditProduct() {
    this.editMenu = false
  }

}