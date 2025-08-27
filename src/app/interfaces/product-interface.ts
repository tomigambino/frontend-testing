import { ProductTypeInterface } from "./productType-interface";

export interface ProductInterface{
    id: number;
    productType: ProductTypeInterface;
    name: string;
    description: string;
    price: number;
    stock: number;
    isActive: boolean;
}