import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../api/user';

@Injectable()
export class UserService {

    constructor(private http: HttpClient) { }

    getUsersSmall() {
        return this.http.get<any>('assets/demo/data/customers-small.json')
            .toPromise()
            .then(res => res.data as User[])
            .then(data => data);
    }

    getUsersMedium() {
        return this.http.get<any>('assets/demo/data/customers-medium.json')
            .toPromise()
            .then(res => res.data as User[])
            .then(data => data);
    }

    getUsersLarge() {
        return this.http.get<any>('assets/demo/data/customers-large.json')
            .toPromise()
            .then(res => res.data as User[])
            .then(data => data);
    }
}
