import { ProductInterface } from "./product-interface";


export interface PaginatedProducts {
  data: ProductInterface[];
  total: number;
  page: number;
  limit: number;
}