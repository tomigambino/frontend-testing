import { Injectable } from "@angular/core";
import { SaleInterface } from "../interfaces/sale-interface";
import { axiosService } from "./axiosClient";


@Injectable({
  providedIn: 'root' // Indica que el servicio se proveerá en la raíz de la aplicación.
})
export class ApiService{

    constructor( ){}

    async generatePay(saleId: number){
      try{
        const response = await axiosService.get(`/pago/${saleId}`)
        return response.data;
      }catch(error){
        console.error('Error generating payment:', error);
        throw error;
      }
    }

}