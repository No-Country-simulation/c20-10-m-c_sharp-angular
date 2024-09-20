import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { of, shareReplay, tap } from 'rxjs';
import { SessionStorageService } from './session-storage.service';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserLocationService {
  private readonly sessionStorageService = inject(SessionStorageService);
  private readonly http = inject(HttpClient);

  private readonly ipApiEndpoint = environment.LOCATION.CURRENT_USER_LOCATION;
  private readonly addressAutocompleteEndpoint = environment.LOCATION.ADDRESS_AUTOCOMPLETE_BASE_URL;
  private readonly addressAutocompleteKey = environment.LOCATION.ADDRESS_AUTOCOMPLETE_KEY;

  public readonly currentUserLocation = signal<any | null>(null);

  public getUserLocation() {
    return this.http.get(this.ipApiEndpoint).pipe(shareReplay(1));
  }

  public addressAutocomplete(query: string) {
    const cachedResponse = this.sessionStorageService.get(`${encodeURIComponent(query)}key`);
    if (cachedResponse) {
      return of(cachedResponse);
    }
    const headers = new HttpHeaders({
      'x-placekit-api-key': this.addressAutocompleteKey,
      'Content-Type': 'application/json',
    });
    const body = { query };
    return this.http.post(this.addressAutocompleteEndpoint, body, { headers }).pipe(
      tap(res => {
        this.sessionStorageService.set(`${encodeURIComponent(query)}key`, res);
      })
    );
  }
}
