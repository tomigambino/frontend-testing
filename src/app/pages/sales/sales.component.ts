import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaleInterface } from '../../interfaces/sale-interface';
import { ApiService } from '../../service/api.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
})
export class SalesComponent implements OnInit {

  sales: SaleInterface[] = [];

  constructor(private apiService: ApiService) {}

  async ngOnInit() {
    this.sales = await this.loadSales()
  }

  trackById = (_: number, item: SaleInterface) => item.id;

  async loadSales(): Promise<SaleInterface[]>{
    return await this.apiService.getAllSales();
  }
}

