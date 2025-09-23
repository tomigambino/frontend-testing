import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../service/cart.service';
import { ApiService } from '../../service/api.service';
import { CartItem } from '../../interfaces/cartItem-interface';
import { SaleDetailInterface } from '../../interfaces/saleDetail-interface';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'] // corregido: plural
})
export class NavbarComponent implements OnInit {

  // CREO QUE HAY QUE CAMBIAR LO DE ITEM PORQUE NO ESTAMOS ACTUALIZANDO EL DETALLE DEL PRODUCTO, SOLO ACTUALIZAMOS LA VISTA

  cartItems: CartItem[] = [];
  cartCount = 0;
  total = 0;
  showCartPanel = false;
  item: any;
  cartDetails: SaleDetailInterface[] = [];

  constructor(
    public cartService: CartService,
    public apiService: ApiService
  ) {}

  ngOnInit(): void {
    // Suscribirse a cambios en el carrito
    this.cartService.getCartObservable().subscribe(async cart => {
      this.cartItems = cart || [];

      //Contamos la cantidad total de productos en el carrito
      this.cartCount = this.cartItems.length;
      if (cart.length > 0) {
        try {
          this.cartDetails = await this.cartService.getCartWithDetails();
          this.total = this.cartDetails.reduce((sum, item) => sum + item.totalDetail, 0);
        } catch (error) {
          console.error('Error loading cart details:', error);
          this.cartDetails = [];
          this.total = 0;
        }
      }
    });
  }

  toggleCart(): void {
    this.showCartPanel = !this.showCartPanel;
  }

  removeProduct(index: number): void {
    this.cartService.removeProduct(index);
  }

  async payWithMercadoPago(cartDetails: SaleDetailInterface[]): Promise<void> {
    try {
      const saleId = await this.apiService.createSale(cartDetails);
      const initPoint = await this.apiService.generatePay(saleId);

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
