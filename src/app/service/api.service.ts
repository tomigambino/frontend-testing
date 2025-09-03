import { Injectable } from "@angular/core";
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

    async getAllImagesByProductId(productId: number){
      try{
        const response = await axiosService.get(`/images/product/${productId}`)
        return response.data;
      }catch(error){
        console.error('Error find images by products:', error);
        throw error;
      }
    }

    async getSpecificImage(productId: number, imageId: number){
      try{
        const response = await axiosService.get(`/images/product/${productId}/image/${imageId}`)
        return response.data;
      }catch(error){
        console.error('Error find specific image:', error);
        throw error;
      }
    }

    async getAllProducts(){
      try{
        const response = await axiosService.get(`/producto`)
        return response.data;
      }catch (error){
        console.error('Error find products:', error);
        throw error;
      }
    }

    async getAllProductByProductType(productTypeId: number){
      try{
        const response = await axiosService.get(`/producto/tipo/${productTypeId}`)
        return response.data;
      }catch (error){
        console.error('Error find products by product type:', error);
        throw error;
      }
    }

}