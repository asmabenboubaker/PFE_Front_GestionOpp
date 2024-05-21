import { Component, OnInit } from '@angular/core';
import * as SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs'; // Import Client from '@stomp/stompjs'
import { Subject } from "rxjs";
import {TokenStorageService} from "../../../Global/shared-service/token-storage.service";

@Component({
    selector: 'app-web-socket',
    templateUrl: './web-socket.component.html',
    styleUrls: ['./web-socket.component.scss']
})
export class WebSocketComponent implements OnInit {
    stompClient: any;
    topic = '/topic/greetings';
    responseSubject = new Subject<any>();
    webSocketEndPoint = 'http://localhost:8888/demo_war/ws';
    constructor(private tokenStorage: TokenStorageService) { }

    connect() {
        // Retrieve the JWT token from wherever it's stored in your Angular application
        const jwtToken = localStorage.getItem('Authorization');
       const token =  this.tokenStorage.getToken()
        // Define the headers with the JWT token
        const headers = {
            Authorization: `Bearer ${token}`
        };

        // Create a new SockJS instance with custom headers
        let ws = new SockJS(this.webSocketEndPoint, null, {
            headers: headers
        });

        console.log("Initialize WebSocket Connection");
        //let ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = new Client(); // Create a new Stomp client instance
        this.stompClient.webSocketFactory = () => ws; // Set the WebSocket factory function
        const _this = this;
        _this.stompClient.activate(); // Activate the Stomp client
        _this.stompClient.onConnect = function (frame) { // Define onConnect callback
            _this.stompClient.subscribe(_this.topic, function (sdkEvent) {
                _this.onMessageReceived(sdkEvent);
            });
        };
        _this.stompClient.onError = function (error) { // Define onError callback
            console.log("errorCallBack -> " + error);
            setTimeout(() => {
                _this.connect();
            }, 5000);
        };

    }

    disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.deactivate(); // Deactivate the Stomp client
        }
        console.log("Disconnected");
    }

    send(message: any) {
        if (this.stompClient && this.stompClient.connected) {
            console.log("calling logout api via web socket");
            this.stompClient.publish({ destination: "/app/greet", body: JSON.stringify(message) });
        } else {
            console.error("WebSocket connection is not established.");
        }
    }


    onMessageReceived(message: any) {
        console.log("Message Recieved from Server :: " + message);

        const obj = JSON.parse(message.body);
        this.responseSubject.next(obj);
    }



    ngOnInit(): void { }
}
