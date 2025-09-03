// ventas.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


type SortKey = 'revenue' | 'unitsSold' | 'name';
type SortDir = 'asc' | 'desc';

interface SaleItem {
  id: string;
  name: string;
  imageUrl: string;
  unitPrice: number; // Precio unitario
  unitsSold: number; // Cantidad vendida
}

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
})
export class SalesComponent {
  // Estado UI
  search = '';
  sortKey: SortKey = 'revenue';
  sortDir: SortDir = 'desc';

  // Datos de ejemplo (podés reemplazar por tus datos)
  items: SaleItem[] = [
    {
      id: '1',
      name: 'Botines Nike Mercurial',
      imageUrl: 'frontend-testing/src/assets/img/messi.jpg',
      unitPrice: 165000,
      unitsSold: 12,
    },
    
  ];

  trackById = (_: number, item: SaleItem) => item.id;

  // Derivados
  get rows() {
    const q = this.search.trim().toLowerCase();

    const computed = this.items
      .map((i) => ({
        ...i,
        revenue: i.unitPrice * i.unitsSold,
      }))
      .filter((i) => (q ? i.name.toLowerCase().includes(q) : true))
      .sort((a, b) => {
        const dir = this.sortDir === 'asc' ? 1 : -1;
        switch (this.sortKey) {
          case 'name':
            return a.name.localeCompare(b.name) * dir;
          case 'unitsSold':
            return (a.unitsSold - b.unitsSold) * dir;
          case 'revenue':
          default:
            return (a.revenue - b.revenue) * dir;
        }
      });

    return computed;
  }

  get totalProducts(): number {
    return this.rows.length;
  }

  get totalUnits(): number {
    return this.rows.reduce((acc, r) => acc + r.unitsSold, 0);
  }

  get totalRevenue(): number {
    return this.rows.reduce((acc, r) => acc + r.revenue, 0);
  }

  setSort(key: SortKey) {
    if (this.sortKey === key) {
      this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = key;
      this.sortDir = key === 'name' ? 'asc' : 'desc';
    }
  }
}

