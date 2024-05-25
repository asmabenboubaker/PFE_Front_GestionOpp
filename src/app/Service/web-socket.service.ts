import { Injectable } from '@angular/core';

import { Client, Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private client: any;
  private notificationSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public notifications$: Observable<any[]> = this.notificationSubject.asObservable();

  constructor() {
    this.client = Stomp.over(new SockJS('http://localhost:8888/demo_war/ws'));
    this.client.connect({}, () => {
      this.client.subscribe('/topic/notifications', (message) => {
        const notification: Notification = JSON.parse(message.body);
        this.notificationSubject.next([...this.notificationSubject.value, notification]);
      });
    });
  }

  public sendNotification(message: string): void {
    this.client.send('/app/send', {}, JSON.stringify({ message }));
  }
}
