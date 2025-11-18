import { Component, OnInit } from "@angular/core";
import { RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms";

import { ApiService } from "../../service/api.service";
import { ProductInterface } from "../../interfaces/product-interface";
import { ProductTypeInterface } from "../../interfaces/productType-interface";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css']
})
export class MyProductComponent implements OnInit {
  // --- Listado y paginación ---
  total = 0;
  page = 1;
  limit = 5;
  totalPages = 0;
  pages: number[] = [];
  products: ProductInterface[] = [];
  productTypes: ProductTypeInterface[] = [];
  selectedTypeId: number | null = null;
  selectedFiles: File[] = [];

  // --- Estados UI ---
  menuOpen = false;
  addMenu = false;
  editMenu = false;

  // --- Producto a editar ---
  selectedProduct: ProductInterface | null = null;

  // --- Formularios Reactivos ---
  productForm: FormGroup;
  successMsg = '';
  errorMsg = '';

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      productTypeId: [null, Validators.required]
    });
  }

  async ngOnInit() {
    await this.loadProducts();
    await this.loadProductTypes();
  }

  // --- Cargar productos ---
  async loadProducts(): Promise<void> {
    const res = await this.apiService.getProducts(this.page, this.limit);
    this.products = res.data;
    this.total = res.total;
    this.totalPages = Math.ceil(this.total / this.limit);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  // --- Cargar tipos de producto ---
  async loadProductTypes(): Promise<void> {
    this.productTypes = await this.apiService.getProductTypes();
  }

  // --- Filtrar por tipo ---
  async filterByType(typeId: number): Promise<void> {
    if (this.selectedTypeId === typeId) {
      this.selectedTypeId = null;
      await this.loadProducts();
      return;
    }
    this.selectedTypeId = typeId;
    const res = await this.apiService.getAllProductByProductType(typeId, this.page, this.limit);
    this.products = res.data;
    this.total = res.total;
    this.totalPages = Math.ceil(this.total / this.limit);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  // --- CREAR producto ---
  async onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      this.errorMsg = 'Información incompleta o incorrecta';
      return;
    }

    if (this.selectedFiles.length === 0) {
      this.errorMsg = 'Debe seleccionar al menos una imagen';
      return;
    }

    try {
      const { productTypeId, name, description, price, stock } = this.productForm.value;
      
      await this.apiService.createProduct(
        name, 
        description, 
        price, 
        stock, 
        productTypeId,
        this.selectedFiles
      );

      this.successMsg = 'Producto creado con éxito';
      this.errorMsg = '';

      setTimeout(async () => {
        this.cerrarAddProduct();
        await this.loadProducts();
      }, 1500);
    } catch (err) {
      console.error('Error al crear producto:', err);
      this.errorMsg = 'Error al crear producto';
    }
  }

  // --- EDITAR producto ---
  editProduct(product: ProductInterface) {
    this.selectedProduct = product;
    this.editMenu = true;
    
    // Cargar datos del producto en el formulario
    this.productForm.patchValue({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      productTypeId: product.productType.id
    });
    
    this.selectedFiles = [];
    this.successMsg = '';
    this.errorMsg = '';
  }

  async onSubmitEdit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      this.errorMsg = 'Información incompleta o incorrecta';
      return;
    }

    if (!this.selectedProduct) {
      this.errorMsg = 'No hay producto seleccionado';
      return;
    }

    try {
      const { productTypeId, name, description, price, stock } = this.productForm.value;
      
      await this.apiService.updateProduct(
        this.selectedProduct.id,
        name,
        description,
        price,
        stock,
        productTypeId,
        this.selectedFiles.length > 0 ? this.selectedFiles : undefined
      );

      this.successMsg = 'Producto actualizado con éxito';
      this.errorMsg = '';

      setTimeout(async () => {
        this.cerrarEditProduct();
        await this.loadProducts();
      }, 1500);
    } catch (err) {
      console.error('Error al actualizar producto:', err);
      this.errorMsg = 'Error al actualizar producto';
    }
  }

  // --- ELIMINAR producto ---
  async deleteProduct(productId: number) {
    if (!confirm('¿Seguro que deseas eliminar este producto?')) return;

    try {
      await this.apiService.deleteProduct(productId);
      await this.loadProducts();
      this.successMsg = 'Producto eliminado con éxito';
      this.errorMsg = '';
    } catch (err: any) {
      console.error('Error al eliminar producto:', err);
      this.errorMsg = err?.response?.data?.message || 'No se pudo eliminar el producto';
    }
  }

  // --- Paginación ---
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

  // --- Manejo de archivos ---
  onFileSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files);
  }

  // --- Control de UI ---
  toggleMenu() { 
    this.menuOpen = !this.menuOpen; 
  }

  addProduct() { 
    this.addMenu = true;
    this.productForm.reset({ price: 0, stock: 0 });
    this.selectedFiles = [];
    this.successMsg = '';
    this.errorMsg = '';
  }

  cerrarAddProduct() { 
    this.addMenu = false; 
    this.productForm.reset({ price: 0, stock: 0 }); 
    this.selectedFiles = [];
    this.successMsg = '';
    this.errorMsg = '';
  }

  cerrarEditProduct() { 
    this.editMenu = false;
    this.selectedProduct = null;
    this.productForm.reset({ price: 0, stock: 0 });
    this.selectedFiles = [];
    this.successMsg = '';
    this.errorMsg = '';
  }
}