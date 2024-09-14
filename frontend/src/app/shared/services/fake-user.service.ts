import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageResponse } from '../../core/interfaces/message.interface';

@Injectable({
  providedIn: 'root'
})
export class FakeUserService {

  private http = inject(HttpClient);

  getUserMessagesFromOneUser(id: string) {
    return this.http.get<any>('assets/demo/messages.json')
      .toPromise()
      .then( res => res.data.filter((userMessage: any) => userMessage.id === id))
      .then( data => data as MessageResponse);
  }

  getAllUserMessages() {
    return this.http.get<any>('assets/demo/messages.json')
      .toPromise()
      .then( res => res.data as MessageResponse[] )
      .then( data => data );
  }

  addNewUserMessage(idUser: string, message: MessageResponse) {
    return this.http.get<any>('assets/demo/messages.json')
      .toPromise()
      .then( res => {
        res.data.forEach( (offerer: any, index: any) => {
          if(offerer.id === idUser) {
            res.data[index].messages.push(message as any);
          }
        });
        return res.data;
      })
      .then( data => data as MessageResponse[] );
  }

}
