import { ProductInterface } from "./product-interface";
import { SaleInterface } from "./sale-interface";

export interface SaleDetailInterface{
    id: number;
    //Que atributo tendria sale aca?
    sale: SaleInterface;
    product: ProductInterface;
    quantity: number;
    color: string;
    totalDetail: number;
}