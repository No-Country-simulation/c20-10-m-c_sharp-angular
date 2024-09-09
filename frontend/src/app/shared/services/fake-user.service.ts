import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserMessage } from '../../core/interfaces';
import { gridOffererChats } from '../../../assets/demo/grid-offerer-chats';

@Injectable({
  providedIn: 'root'
})
export class FakeUserService {

  private http = inject(HttpClient);

  getUserMessagesFromOneUser(id: string) {
    return this.http.get<any>('assets/demo/messages.json')
      .toPromise()
      .then( res => res.data.filter((userMessage: any) => userMessage.id === id))
      .then( data => data as UserMessage);
  }

  getAllUserMessages() {
    return this.http.get<any>('assets/demo/grid-offerer-chats.ts')
      .toPromise()
      .then( res => res.data as UserMessage[] )
      .then( data => data );
  }

  addNewUserMessage(idUser: string, message: UserMessage) {
    gridOffererChats.forEach( (offerer, index) => {
      if(offerer.id === idUser) {
        gridOffererChats[index].messages.push(message as any);
      }
    });

    return this.http.get<any>('assets/demo/grid-offerer-chats.ts')
      .toPromise()
      .then( res => res.data as UserMessage[] )
      .then( data => data );
  }

}
