export interface Speciality {
  categoryId?: number;
  name: string;
  description: string;
}

export interface SpecialityResponse {
  name: string;
  description: string;
  categoryId: number;
  id: number;
  isActive: boolean;
}

export interface SpecialityErrorResponse {
  type: string;
  title: string;
  status: number;
  traceId: string;
}
