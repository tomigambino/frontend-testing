import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class Footer {

  constructor(private apiService: ApiService){}

  async payWithMercadoPago(){
    try {
    const initPoint = await this.apiService.generatePay(1);

    console.log('InitPoint recibido:', initPoint);

    if (!initPoint) {
      console.error('❌ initPoint está vacío o undefined');
      return;
    }

    // Forzar salida directa del Router y abrir MP
    window.location.href = initPoint;
  } catch (error) {
    console.error('Error en payWithMercadoPago:', error);
  }
  }

}
