export interface UserSpeciality {
  id: number;
  isActive: boolean;
  createdAt: Date;
  idUser: string;
  user: string;
  idSpeciality: number;
  speciality: USpeciality;
  title: string;
  text: string;
  area: string;
  latitude: string;
  longitude: string;
}

export interface CreateUserSpeciality {
  idUser: string;
  idSpeciality: number;
  title: string;
  text: string;
  area: string;
  latitude: string;
  longitude: string;
}

export interface USpeciality {
  id: number;
  isActive: boolean;
  createdAt: Date;
  name: string;
  description: string;
  src: string;
  categoryId: number;
  userSpecialities: string[];
}

export interface UserSpecialitySearch {
  userSpecialityId: number;
  idUser: string;
  userName: string;
  idSpeciality: number;
  specialityName: string;
  categoryId: number;
  title: string;
  text: string;
  rating: number;
  area: string;
  src?: string;
  latitude?: number;
  longitude?: number;
  distance?: number;
  distanceFormatted?: string;
  route: string;
}
