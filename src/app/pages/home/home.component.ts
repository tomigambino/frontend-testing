import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  Product = []; // tu array completo
  currentPage = 1;
  itemsPerPage = 8;

  goToPage(page: number): void {
    this.currentPage = page;
  }
}
