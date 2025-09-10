import { Component } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductInterface } from '../../interfaces/product-interface';
import { SaleDetailInterface } from '../../interfaces/saleDetail-interface';

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

  constructor(public cartService: CartService) {
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
}