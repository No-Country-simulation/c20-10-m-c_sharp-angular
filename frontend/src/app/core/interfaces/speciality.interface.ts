export interface Speciality {
  id: number;
  isActive: boolean;
  createdAt: Date;
  name: string;
  description: string;
  categoryId: number;
  userSpecialities: string[];
}

export interface PostSpecialityFormValue {
  categoryId: number;
  name: string;
  description: string;
}
export type PostSpecialityResponse = Speciality;
export interface PutSpecialityFormValue {
  id: number;
  name: string;
  description: string;
}
export type PutSpecialityResponse = Speciality;

export interface SpecialityErrorResponse {
  type: string;
  title: string;
  status: number;
  traceId: string;
}
export interface GetSpecialitiesErrorResponse {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
  additionalProp1: string;
  additionalProp2: string;
  additionalProp3: string;
}
