import { CustomerInterface } from "./customer-interface";
import { SaleDetailInterface } from "./saleDetail-interface";
import { SaleStatusInterface } from "./saleStatus-interface";

export interface SaleInterface{
    id: number;
    saleDate: Date;
    customer: CustomerInterface;
    saleDetail: SaleDetailInterface[];
    deposit: number;
    total: number;
    appliedDiscount: number;
    saleStatus: SaleStatusInterface;
    estimatedDeliveryDate: Date;
}
