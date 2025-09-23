import { Injectable } from "@angular/core";
import { axiosService } from "./axiosClient";
import { SaleDetailInterface } from "../interfaces/saleDetail-interface";
import { SaleInterface } from "../interfaces/sale-interface";

@Injectable({
  providedIn: 'root' // Indica que el servicio se proveerá en la raíz de la aplicación.
})
export class ApiService{

    constructor( ){}

      // Inicia sesión con email y contraseña y guarda el token de acceso
  async login(email: string, password: string) {
    try {
      const data = { email, password }
      const response = await axiosService.post('/login', data)
      localStorage.setItem('accessToken', response.data.accessToken) // Guarda el token en localStorage
      return;
    } catch (error) {
      throw new Error('Datos incorrectos o usuario no registrado');
    }
  }

  // Registra un nuevo usuario con los datos proporcionados
  async signUp(name: string, surname: string, email: string, password: string) {
    try {
      const data = { name, surname, email, password }
      const response = await axiosService.post('/register', data)
      return response.data // Devuelve los datos del usuario registrado
    } catch (error) {
      throw error;
    }
  }

    async createSale(cartDetails: SaleDetailInterface[]): Promise<number> {
      try {
        const saleDetailsIds: number[] = [];
        // Primero, crear cada detalle de venta y almacenar sus IDs
        for (const detail of cartDetails) {
          const response = await axiosService.post('/detalleVenta', {productId: detail.product.id, quantity: detail.quantity});
          saleDetailsIds.push(response.data.id);
        }
        // REEMPLAZAR EL CUSTOMER ID CON EL ID DEL USUARIO LOGUEADO
        const response = await axiosService.post('/venta', { customerId: 1, saleDetailIds: saleDetailsIds });
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