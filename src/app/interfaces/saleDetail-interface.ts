import { ProductInterface } from "./product-interface";
//import { SaleInterface } from "./sale-interface";

export interface SaleDetailInterface{
    //sale: SaleInterface;
    product: ProductInterface;
    quantity: number;
    totalDetail: number;
}