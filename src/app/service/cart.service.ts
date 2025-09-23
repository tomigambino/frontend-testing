import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SaleDetailInterface } from '../interfaces/saleDetail-interface';
import { ProductInterface } from '../interfaces/product-interface';
import { ApiService } from './api.service';
import { CartItem } from '../interfaces/cartItem-interface';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartKey = 'cart';
  private cart$ = new BehaviorSubject<CartItem[]>(this.loadCart());
  constructor(private apiService: ApiService) {}

   // Carga inicial del carrito
  private loadCart(): CartItem[] {
    try {
      const stored = localStorage.getItem(this.cartKey);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading cart:', error);
      return [];
    }
  }

  // Obtiene el carrito actual
  getCart(): CartItem[] {
    return this.cart$.value;
  }

  // Carga inicial del carrito desde localStorage.
  getCartObservable(): Observable<CartItem[]> {
    return this.cart$.asObservable();
  }

  // Permite que los componentes se suscriban a cambios del carrito.
  addToCart(productId: number, quantity: number) {
    const currentCart = this.getCart();
    const existingItemIndex = currentCart.findIndex(item => item.productId === productId);

    if (existingItemIndex >= 0) {
      // Si ya existe, actualiza cantidad
      currentCart[existingItemIndex].quantity += quantity;
    } else {
      // Si no existe, agrega nuevo item
      currentCart.push({
        productId,
        quantity,
      });
    }

    this.updateCart(currentCart);
  }

  updateCart(currentCart: CartItem[]) {
    localStorage.setItem(this.cartKey, JSON.stringify(currentCart));
    this.cart$.next([...currentCart]);
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

  // cart.service.ts
async getCartWithDetails(): Promise<SaleDetailInterface[]> {
  const cartItems = this.getCart(); // [{ productId: 1, quantity: 2 }]
  console.log('Current cart items:', cartItems);
  if (cartItems.length === 0) {
    return [];
  }
  
  const productIds = cartItems.map(item => item.productId);
  
  try {
    console.log('Product IDs to fetch:', productIds);
    // Buscar productos por IDs
    const products: ProductInterface[] = await this.apiService.getProductsByIds(productIds);
    
    // Convertir a tu SaleDetailInterface
    const saleDetails: SaleDetailInterface[] = [];
    
    for (const cartItem of cartItems) {
      const product = products.find(p => p.id === cartItem.productId);
      
      if (product) {
        saleDetails.push({
          product: product,                                    // ProductInterface completo
          quantity: cartItem.quantity,                         // Cantidad del carrito
          totalDetail: product.price * cartItem.quantity       // Precio actual × cantidad
        });
      }
    }
    
    return saleDetails;
    
  } catch (error) {
    console.error('Error loading cart details:', error);
    return [];
  }
}
}