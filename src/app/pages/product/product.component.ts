import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { ProductInterface } from '../../interfaces/product-interface';
import { CartService } from '../../service/cart.service';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductDetailComponent implements OnInit {
  product!: ProductInterface;
  mainImage: string = ''; // imagen principal que se muestra
  currentQuantity: number = 1 //Cantidad por defecto

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private cartService: CartService
  ) {}

  async ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
    const id = Number(idParam); // conversión a number
    this.product = await this.apiService.getProductById(id);
    if(this.product.images && this.product.images.length > 0){
      this.mainImage = this.product.images[0].url; // Asigna la primera imagen como imagen principal
    }
  } else {
    // Manejar el caso en que no haya id en la URL
    console.error('No se encontró el ID en la ruta');
  }
  }

  increment(): void {
    this.currentQuantity++;
  }

  decrement(): void {
    if (this.currentQuantity > 1) {
      this.currentQuantity--;
    }
  }

  async addToCart(prod: ProductInterface){
    await this.cartService.addToCart(prod.id, this.currentQuantity)
    this.currentQuantity = 1;
  }
}
