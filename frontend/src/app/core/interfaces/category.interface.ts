export interface Category {
  id?: number;
  name: string;
  description: string;
}

export interface CategoryResponse {
  name: string;
  description: string;
  id: number;
  isActive: boolean;
}

export interface CategoryErrorResponse {
  type: string;
  title: string;
  status: number;
  traceId: string;
}
