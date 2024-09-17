import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User, UserMessages, UserUpdate } from '../interfaces';
import { Message, MessageCreatedResponse } from '../interfaces/message.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.BASE_URL;
  private readonly userEndpoint = environment.ENDPOINT.USER;
  private readonly userMessagesEndpoint = environment.ENDPOINT.USER_MESSAGES;
  private readonly userProfiles = environment.ENDPOINT.USERS_PROFILE;

  /**
   * Gets the user data.
   *
   * @returns An observable that emits the server response.
   */
  public getUserData(): Observable<User> {
    return this.http.get<User>(this.baseUrl + this.userEndpoint);
  }

  public getUserProfileData(): Observable<User> {
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
  public getUserMessagesFromOneUser(id: string): Observable<UserMessages> {
    return this.http.get<UserMessages>(`${this.baseUrl}${this.userMessagesEndpoint}/${id}`);
  }

  /**
   * Gets all messages from a logged user.
   *
   * @returns An observable that emits the server response.
   */
  public getAllUserMessages(): Observable<UserMessages[]> {
    return this.http.get<UserMessages[]>(this.baseUrl + this.userMessagesEndpoint);
  }

  /**
   * Create a message from a user.
   *
   * @param userId
   * @param message
   *  - message: string
   *  - createdAt: Date
   *  - userId: string
   * @returns An observable that emits the server response.
   */
  public addNewUserMessage(userId: string, message: Message): Observable<MessageCreatedResponse> {
    return this.http.post<MessageCreatedResponse>(
      `${this.baseUrl}${this.userMessagesEndpoint}/${userId} `,
      message
    );
  }

  /**
   * Gets a list with all user's profile.
   *
   * @returns An observable that emits the server response.
   */
  public getProfilesList(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + this.userProfiles);
  }

  public getProfileById(id: string){
    return this.http.get(this.baseUrl + this.userEndpoint + "/" + id);
  }

}
