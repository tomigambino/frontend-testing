import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productos = [
    {
      id: 1,
      nombre: 'Botines Nike Mercurial',
      precio: 4500,
      descripcion: 'Botines de alto rendimiento para césped natural.',
      imagen: 'assets/img/messi.jpg'
    },
    {
      id: 2,
      nombre: 'Pelota UEFA Champions League 2024',
      precio: 2000,
      descripcion: 'Pelota oficial con diseño exclusivo...',
      imagen: 'assets/img/pelota.jpg'
    },
    {
      id: 3,
      nombre: 'Remera Zanetti Inter de Milan',
      precio: 1500,
      descripcion: 'Remera técnica para entrenamientos intensos.',
      imagen: 'assets/img/zanetti.webp'
    }
  ];

  getProductoPorId(id: number) {
    return this.productos.find(p => p.id === id);
  }

  getTodos() {
    return this.productos;
  }
}
