import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private countriesUrl = 'https://restcountries.com/v3.1/all';
  //private geoDbCitiesUrl = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities';
  private geoNamesBaseUrl = 'http://api.geonames.org/';
  private username = 'mrmolanodev';

  constructor(private http: HttpClient) {}

  getCountries(): Observable<any> {
    return this.http.get<any>(this.countriesUrl);
  }

  getCitiesByCountry(countryCode: string): Observable<any> {
    const headers = new Headers({});
    //Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http.get(
      `${this.geoNamesBaseUrl}searchJSON?country=${countryCode}&featureClass=P&maxRows=1000&username=${this.username}`
    );
  }
}
