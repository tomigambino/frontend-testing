import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductDetailComponent implements OnInit {
  product: any = {};

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    // Aquí buscás el producto por ID (puede ser desde un servicio)
    // Ejemplo mock:
    this.product = {
      id,
      nombre: 'Pelota UEFA Champions League 2024',
      precio: 2000,
      descripcion: 'Pelota oficial con diseño exclusivo...',
      imagen: 'assets/img/pelota.jpg',
      cantidad: 1
    };
  }

  increment() {
    this.product.cantidad++;
  }

  decrement() {
    if (this.product.cantidad > 1) {
      this.product.cantidad--;
    }
  }

  confirmarCarrito(prod: any) {
    console.log(`Agregaste ${prod.cantidad} unidad(es) de ${prod.nombre}`);
  }
}