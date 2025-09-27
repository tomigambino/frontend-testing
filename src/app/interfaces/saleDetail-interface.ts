import { ProductInterface } from "./product-interface";

export interface SaleDetailInterface{
    product: ProductInterface;
    quantity: number;
    totalDetail: number;
}