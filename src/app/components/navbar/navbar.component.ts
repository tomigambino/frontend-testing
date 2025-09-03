import { Component } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class Navbar {
  cartCount = 0;
  showCartPanel = false;

  constructor(public cartService: CartService) {
    this.cartService.items$.subscribe(items => {
      this.cartCount = items.length;
    });
  }

  toggleCart() {
    this.showCartPanel = !this.showCartPanel;
  }
}