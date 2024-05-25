import { Component, OnInit } from '@angular/core';
import * as SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs'; // Import Client from '@stomp/stompjs'
import { Subject } from "rxjs";
import {TokenStorageService} from "../../../Global/shared-service/token-storage.service";
import {WebSocketService} from "../../../../Service/web-socket.service";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-web-socket',
    templateUrl: './web-socket.component.html',
    styleUrls: ['./web-socket.component.scss']
})
export class WebSocketComponent implements OnInit {
    notifications: any[] = [];
    newMessage: string = '';

    constructor(private webSocketService: WebSocketService, private http: HttpClient) {}

    ngOnInit() {
        this.webSocketService.notifications$.subscribe((notifications) => {
            this.notifications = notifications;
        });
        this.http.get<Notification[]>('http://localhost:8888/demo_war/notifications').subscribe((notifications) => {
            this.notifications = notifications;
        });
    }

    sendNotification() {
        this.webSocketService.sendNotification(this.newMessage);
        this.newMessage = '';
    }
}
