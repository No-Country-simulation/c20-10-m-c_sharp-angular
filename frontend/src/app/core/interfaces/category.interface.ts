export interface Category {
  id?: number;
  name: string;
  description: string;
}

export interface CategoryResponse {
  categoryId: number; // nuevo nombre
  name: string;
  description: string;
  isActive: boolean;
  scr: string;
  src: string; // nueva propiedad
  createdAt: Date;
  listSpecialitiesId: number[]; // nueva propiedad con la lista de especialidades
  route?: string; // Esto es unicamente del frontend
}

export interface CategoryErrorResponse {
  type: string;
  title: string;
  status: number;
  traceId: string;
}
