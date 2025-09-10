import { Component } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductInterface } from '../../interfaces/product-interface';
import { SaleDetailInterface } from '../../interfaces/saleDetail-interface';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class Navbar {
  cartItems: SaleDetailInterface[] = []
  cartCount = 0;
  total = 0;
  showCartPanel = false;

  constructor(public cartService: CartService,
    public apiService: ApiService
  ) {
  }

  ngOnInit(){
    this.cartService.getCartObservable().subscribe(cart => {
      this.cartItems = cart;
      this.cartCount = cart.length;
      this.total = cart.reduce((sum, item) => sum + item.totalDetail, 0);
    });
  }

  toggleCart() {
    this.showCartPanel = !this.showCartPanel;
  }

  removeProduct(index: number) {
    this.cartService.removeProduct(index);
  }

  async payWithMercadoPago(){
    try {
    const initPoint = await this.apiService.generatePay(1);

    if (!initPoint) {
      console.error('InitPoint está vacío o undefined');
      return;
    }

    // Forzar salida directa del Router y abrir MP
    window.location.href = initPoint;
  } catch (error) {
    console.error('Error en payWithMercadoPago:', error);
  }
  }
}