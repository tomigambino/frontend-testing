import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  private itemsSubject = new BehaviorSubject<any[]>([]);
  items$ = this.itemsSubject.asObservable();

  get items() {
    return this.itemsSubject.value;
  }

  addProduct(product: any) {
    this.itemsSubject.next([...this.items, product]);
  }

  removeProduct(index: number) {
    const updated = this.items.filter((_, i) => i !== index);
    this.itemsSubject.next(updated);
  }

  getTotal() {
    return this.items.reduce((acc, item) => acc + (item.price || 0), 0);
  }
}