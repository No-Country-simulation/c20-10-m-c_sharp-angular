import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  // Variable que almacena la ubicación del usuario (longitud, latitud) o undefined si no está disponible
  public useLocation?: [number, number];

  // Propiedad booleana que indica si la ubicación del usuario está lista
  get isUserLocationReady(): boolean {
    return !!this.useLocation;
  }

  constructor() {
    // Llama al método getUserLocation al construir el servicio para obtener la ubicación del usuario automáticamente
    this.getUserLocation();
  }

  // Método que obtiene la ubicación actual del usuario de manera asíncrona
  public async getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      // Utiliza la API de geolocalización del navegador para obtener la ubicación actual
      navigator.geolocation.getCurrentPosition(
        // Si la geolocalización es exitosa, almacena las coordenadas en useLocation
        ({ coords }) => {
          this.useLocation = [coords.longitude, coords.latitude];
          resolve(this.useLocation);
        },
        // En caso de error, muestra una alerta y rechaza la promesa
        (err) => {
          alert('No se pudo obtener la geolocalización');
          console.log(err);
          reject();
        }
      );
    });
  }
}
