import { Injectable } from '@angular/core';
import { UserSpecialitySearch } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class DistancesService {
  // Radius of the Earth in kilometers
  private readonly R = 6371;

  /**
   * - Method for calculating the distance between two coordinates
   * - For example between the customer and the supplier
   */
  public calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const lat1Rad = this.toRadians(lat1);
    const lon1Rad = this.toRadians(lon1);
    const lat2Rad = this.toRadians(lat2);
    const lon2Rad = this.toRadians(lon2);

    const deltaLat = lat2Rad - lat1Rad;
    const deltaLon = lon2Rad - lon1Rad;

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return this.R * c;
  }

  /**
   * Method for calculating distances between the user's location and multiple publications
   */
  public calculateDistances(
    userLat: number,
    userLon: number,
    posts: UserSpecialitySearch[]
  ): UserSpecialitySearch[] {
    console.log(posts);
    return posts.map(post => {
      const distanceKm = this.calculateDistance(userLon, userLat, post.latitude!, post.longitude!);

      let distanceFormatted: string;
      if (distanceKm < 1) {
        const distanceMeters = distanceKm * 1000;
        distanceFormatted = `${distanceMeters.toFixed(0)} m`;
      } else {
        distanceFormatted = `${distanceKm.toFixed(2)} km`;
      }

      return {
        ...post,
        distance: distanceKm,
        distanceFormatted: distanceFormatted,
      };
    });
  }

  // Method to convert degrees to radians
  private toRadians(degree: number): number {
    return degree * (Math.PI / 180);
  }
}
