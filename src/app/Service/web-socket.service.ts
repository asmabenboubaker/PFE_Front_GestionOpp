import { Injectable } from '@angular/core';

import { Client, Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { BehaviorSubject, Observable } from 'rxjs';
import {ToastrService} from "ngx-toastr";
import {CookieService} from "ngx-cookie-service";
import {WsService} from "../../ws.service";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private client: any;
  private notificationSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public notifications$: Observable<any[]> = this.notificationSubject.asObservable();

  constructor(private toastr: ToastrService, private cookieService: CookieService, private wservice:WsService) {
    const username = this.cookieService.get('profil');
    this.client = Stomp.over(new SockJS('http://localhost:8888/demo_war/ws'));
    this.client.connect({}, () => {
      this.client.subscribe('/topic/notifications', (message) => {
        const notification: any = JSON.parse(message.body);
        console.log('Received notification:', notification);
        this.notificationSubject.next([...this.notificationSubject.value, notification]);
if(username.trim()==='oppDG') {
  this.toastr.show(`<a href="${notification.url}" target="_blank">${notification.message}</a>`, 'New Notification', {
    enableHtml: true
  });
}
      });
    });
  }

  public sendNotification(notification: { message: string, url: string ,createdBy:string}): void {
    this.client.send('/app/send', {}, JSON.stringify(notification));
  }
}
