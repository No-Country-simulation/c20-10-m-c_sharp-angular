import { Injectable } from '@angular/core';

interface Country {
  name: string;
  cities: string[];
}

@Injectable({
  providedIn: 'root',
})
export class PerfilService {
  countries: Country[] = [
    {
      name: 'Mexico',
      cities: [
        'Ciudad de México',
        'Guadalajara',
        'Monterrey',
        'Puebla',
        'Tijuana',
        'León',
        'Ciudad Juárez',
        'Querétaro',
        'Cancún',
        'Mérida',
      ],
    },
    {
      name: 'Colombia',
      cities: [
        'Bogotá',
        'Medellín',
        'Cali',
        'Barranquilla',
        'Cartagena',
        'Bucaramanga',
        'Pereira',
        'Santa Marta',
        'Manizales',
        'Ibagué',
      ],
    },
    {
      name: 'Argentina',
      cities: [
        'Buenos Aires',
        'Córdoba',
        'Rosario',
        'Mendoza',
        'La Plata',
        'Tucumán',
        'Mar del Plata',
        'Salta',
        'Santa Fe',
        'San Juan',
      ],
    },
  ];

  getCountries(): string[] {
    return this.countries.map(country => country.name);
  }

  getCitiesByCountry(countryName: string): string[] | undefined {
    const country = this.countries.find(c => c.name === countryName);
    return country ? country.cities : undefined;
  }
}
