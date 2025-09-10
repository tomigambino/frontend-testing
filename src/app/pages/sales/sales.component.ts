import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SaleTicket {
  saleId: string;
  date: string;
  productName: string;
  imageUrl: string;
  unitPrice: number;
  quantity: number;
}

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
})
export class SalesComponent {

  // Datos que luego vendrán del backend
  items: SaleTicket[] = [
    {
      saleId: 'V-001',
      date: '2025-09-10',
      productName: 'Botines Nike Mercurial',
      imageUrl: 'assets/img/messi.jpg',
      unitPrice: 85000,
      quantity: 12
    },
    {
      saleId: 'V-002',
      date: '2025-09-10',
      productName: 'Mochila Jordan Essentials',
      imageUrl: 'assets/img/mochila.jpg',
      unitPrice: 35000,
      quantity: 2
    }
  ];

  trackById = (_: number, item: SaleTicket) => item.saleId;

  get totalRevenue(): number {
    return this.items.reduce((acc, r) => acc + r.unitPrice * r.quantity, 0);
  }
}

