/**
 * Category Related Interfaces
 */

/**
 * Category Main Interface
 */
export interface ICategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  image?: string;
  parentId?: string; // For subcategories
  slug: string;
  isActive: boolean;
  sortOrder: number;
  productCount?: number; // Number of products in this category
  createdAt: string;
  updatedAt: string;
}

/**
 * Category Create/Update Payload
 */
export interface ICategoryPayload {
  name: string;
  description: string;
  icon: string;
  image?: string;
  parentId?: string;
  slug?: string;
  isActive?: boolean;
  sortOrder?: number;
}

/**
 * Category with Subcategories
 */
export interface ICategoryWithSubcategories extends ICategory {
  subcategories: ICategory[];
}

/**
 * Category Navigation Item
 */
export interface ICategoryNavItem {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  image?: string;
  children?: ICategoryNavItem[];
}

/**
 * Category Filter for Products
 */
export interface ICategoryFilter {
  id: string;
  name: string;
  productCount: number;
  isSelected: boolean;
}