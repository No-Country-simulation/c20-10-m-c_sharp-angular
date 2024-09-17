import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserLocationService {
  private readonly http = inject(HttpClient);
  private readonly ipApiEndpoint =
    'http://ip-api.com/json?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon';

  public getUserLocation() {
    return this.http.get(this.ipApiEndpoint).pipe(shareReplay(1));
  }
}
