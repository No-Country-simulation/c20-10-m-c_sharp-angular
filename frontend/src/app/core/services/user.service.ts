/** Temporal */ /* eslint-disable @typescript-eslint/no-explicit-any */
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User, UserMessage, UserUpdate } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.BASE_URL;
  private readonly userEndpoint = environment.ENDPOINT.USER;
  private readonly userMessagesOneEndpoint = environment.ENDPOINT.USER_MESSAGES_ONE;
  private readonly userMessagesAll = environment.ENDPOINT.USER_MESSAGES_ALL;
  private readonly createUserMessage = environment.ENDPOINT.CREATE_USER_MESSAGE;

  /**
   * Gets the user data.
   *
   * @returns An observable that emits the server response.
   */
  public getUserData(): Observable<User> {
    return this.http.get<User>(this.baseUrl + this.userEndpoint);
  }

  /**
   * Updates the user data.
   *
   * @param formValue
   *  - name: string
   *  - surname: string
   * @returns An observable that emits the server response.
   */
  public updateUserData(formValue: UserUpdate): Observable<any> {
    return this.http.put<any>(this.baseUrl + this.userEndpoint, formValue);
  }

  /**
   * Gets messages between user-to-user.
   *
   * @returns An observable that emits the server response.
   */
  public getUserMessagesFromOneUser(id: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + this.userMessagesOneEndpoint.replace(':idOtherUser', id));
  }

  /**
   * Gets all messages from a logged user.
   *
   * @returns An observable that emits the server response.
   */
  public getAllUserMessages(): Observable<any> {
    return this.http.get<any>(this.baseUrl + this.userMessagesAll);
  }

  /**
   * Create a message from a user.
   *
   * @param formValue
   *  - message: string
   *  - createdAt: Date
   *  - userId: string
   * @returns An observable that emits the server response.
   */
  public addNewUserMessage(formValue: UserMessage): Observable<any> {
    return this.http.put<any>(this.baseUrl + this.createUserMessage, formValue);
  }
}
