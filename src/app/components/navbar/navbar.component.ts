import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../service/cart.service';
import { ApiService } from '../../service/api.service';
import { SaleDetailInterface } from '../../interfaces/saleDetail-interface';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'] // corregido: plural
})
export class NavbarComponent implements OnInit {

  cartItems: SaleDetailInterface[] = [];
  cartCount = 0;
  total = 0;
  showCartPanel = false;
  item: any;

  constructor(
    public cartService: CartService,
    public apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.cartService.getCartObservable().subscribe(cart => {
      this.cartItems = cart || [];
      this.cartCount = this.cartItems.length;
      this.total = this.cartItems.reduce(
        (sum, item) => sum + (item.totalDetail || 0),
        0
      );
    });
  }

  toggleCart(): void {
    this.showCartPanel = !this.showCartPanel;
  }

  removeProduct(index: number): void {
    this.cartService.removeProduct(index);
  }

  async payWithMercadoPago(): Promise<void> {
    try {
      const initPoint = await this.apiService.generatePay(1);

      if (!initPoint) {
        console.error('InitPoint está vacío o undefined');
        return;
      }

      window.location.href = initPoint;
    } catch (error) {
      console.error('Error en payWithMercadoPago:', error);
    }
  }

  increment(): void {
    this.item.quantity++;
  }

  decrement(): void {
    if (this.item.quantity > 1) {
      this.item.quantity--;
    }
  }
}
