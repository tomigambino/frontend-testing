import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../service/product.service';

interface Product {
  id: number;
  nombre: string;
  precio: number;
  descripcion?: string;
  imagen: string;        // imagen principal
  imagenes?: string[];   // galería opcional
  cantidad: number;      // cantidad seleccionada
}

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  mainImage: string = ''; // imagen principal que se muestra

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : null;

    if (id !== null && !isNaN(id)) {
      const prod = this.productService.getProductoPorId(id);

      if (prod) {
        // Creamos un array de imágenes aunque solo haya una
        const imagenes = [prod.imagen];
        this.product = { ...prod, imagenes, cantidad: 1 };
        this.mainImage = prod.imagen;
      } else {
        console.warn('Producto no encontrado');
      }
    } else {
      console.error('ID de producto inválido');
    }
  }

  increment(): void {
    this.product.cantidad++;
  }

  decrement(): void {
    if (this.product.cantidad > 1) {
      this.product.cantidad--;
    }
  }

  confirmarCarrito(prod: Product): void {
    console.log(`Agregaste ${prod.cantidad} unidad(es) de ${prod.nombre}`);
  }
}
