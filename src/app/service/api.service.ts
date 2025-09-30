import { Injectable } from "@angular/core";
import { axiosService } from "./axiosClient";
import { SaleDetailInterface } from "../interfaces/saleDetail-interface";
import { SaleInterface } from "../interfaces/sale-interface";
import { AuthService } from "./auth.service";
import { PaginatedSales } from "../interfaces/paginatedSales-interface";
import { PaginatedProducts } from "../interfaces/paginatedProducts";

@Injectable({
  providedIn: 'root' // Indica que el servicio se proveerá en la raíz de la aplicación.
})
export class ApiService{

    constructor( private authService: AuthService ){}

    async createSale(cartDetails: SaleDetailInterface[]): Promise<number> {
      try {
        const saleDetailsIds: number[] = [];
        // Primero, crear cada detalle de venta y almacenar sus IDs
        for (const detail of cartDetails) {
          const response = await axiosService.post('/detalleVenta', {productId: detail.product.id, quantity: detail.quantity});
          saleDetailsIds.push(response.data.id);
        }
        const customerId = await this.authService.getCustomerId();
        const response = await axiosService.post('/venta', { customerId: customerId, saleDetailIds: saleDetailsIds });
        return response.data.id;
      } catch (error) {
        console.error('Error creating sale:', error);
        throw error;
      }
    }

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

    async getSales(page: number, limit: number): Promise<PaginatedSales> {
      const res = await axiosService.get<PaginatedSales>('/venta', {
        params: { page, limit }
      });
      return res.data;
    }

    async getProducts(page: number, limit: number): Promise<PaginatedProducts> {
      const res = await axiosService.get<PaginatedProducts>('/producto', {
        params: { page, limit }
      });
      return res.data;
    }

    async getProductTypes(){
      try{
        const response = await axiosService.get(`/tipoProducto`)
        return response.data;
      }catch (error){
        console.error('Error find product types:', error);
        throw error;
      }
    }

    async getAllProductByProductType(productTypeId: number, page: number, limit: number): Promise<PaginatedProducts>{
      try{
        const response = await axiosService.get(`/producto/tipo/${productTypeId}`, {
          params: { page, limit }
        });
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