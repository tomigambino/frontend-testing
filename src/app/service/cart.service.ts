import { Injectable } from '@angular/core';
import { SaleDetailInterface } from '../interfaces/saleDetail-interface';
import { ProductInterface } from '../interfaces/product-interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartKey = 'cart';
  private cart$ = new BehaviorSubject<SaleDetailInterface[]>(this.loadCart());

  getCart(): SaleDetailInterface[] {
    return JSON.parse(localStorage.getItem(this.cartKey) || '[]');
  }

  private loadCart(): SaleDetailInterface[] {
    return JSON.parse(localStorage.getItem(this.cartKey) || '[]');
  }

  getCartObservable(): Observable<SaleDetailInterface[]> {
    return this.cart$.asObservable();
  }

  addToCart(product: ProductInterface, quantity: number) {
    const saleDetail: SaleDetailInterface = {
        product: product,
        quantity: quantity,
        totalDetail: product.price * quantity
      }
    const cart = this.getCart();
    cart.push(saleDetail);
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
    this.cart$.next(cart);
  }

  removeProduct(index: number) {
    const cart = this.getCart();
    cart.splice(index, 1);
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
    this.cart$.next(cart);
  }

  clearCart() {
    localStorage.removeItem(this.cartKey);
    this.cart$.next([]);
  }
}