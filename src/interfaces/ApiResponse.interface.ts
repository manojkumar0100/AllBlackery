/**
 * Base API Response Interface
 * All API responses follow this structure
 */
export interface IApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

/**
 * API Error Response Interface
 */
export interface IApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

/**
 * Pagination Interface
 */
export interface IPagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

/**
 * Products API Response with Pagination
 */
export interface IProductsResponse {
  products: IProduct[];
  pagination: IPagination;
}