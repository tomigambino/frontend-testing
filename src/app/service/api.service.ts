import { Injectable } from "@angular/core";
import { axiosService } from "./axiosClient";
import { SaleDetailInterface } from "../interfaces/saleDetail-interface";
import { SaleInterface } from "../interfaces/sale-interface";

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

    async getProductById(productId: number){
      try{
        const response = await axiosService.get(`/producto/${productId}`)
        return response.data;
      } catch(error){
        console.error('Error find products:', error);
        throw error;
      }
    }

    async getProductsByIds(idsParam: number[]){
      try{
        console.log('IDs recibidos en getProductsByIds:', idsParam);
        // Convertimos el array a string separado por comas
        const idsString = idsParam.join(',');
        const response = await axiosService.get('/producto/carrito', {
          params: {
            ids: idsString
          }
        })
        return response.data;
      }catch(error){
        console.error('Error find products by ids:', error);
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

    async postSaleDetail(saleDetail: SaleDetailInterface){
      try{
        const response = await axiosService.post(`/detalle-venta`, saleDetail)
        return response.data;
      } catch (error){
        console.error('Error posting sale detail:', error);
        throw error;
      }
    }

    async postSale(sale: SaleInterface){
      try{
        const response = await axiosService.post(`/venta`, sale)
        return response.data;
      } catch (error){
        console.error('Error posting sale:', error);
        throw error;
      }
    }
}