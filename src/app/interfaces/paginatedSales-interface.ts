import { SaleInterface } from "./sale-interface";

export interface PaginatedSales {
  data: SaleInterface[];
  total: number;
  page: number;
  limit: number;
}