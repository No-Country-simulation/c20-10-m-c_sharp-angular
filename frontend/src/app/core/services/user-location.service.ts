import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, shareReplay, tap } from 'rxjs';
import { SessionStorageService } from './session-storage.service';
import { UserLocation } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserLocationService {
  private readonly sessionStorageService = inject(SessionStorageService);
  private readonly http = inject(HttpClient);
  private readonly ipApiEndpoint =
    'http://ip-api.com/json?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon';

  public getUserLocation(): Observable<UserLocation> {
    return this.http.get<UserLocation>(this.ipApiEndpoint).pipe(
      shareReplay(1),
      tap(res => this.sessionStorageService.set('currentUserLocation', res))
    );
  }
}
