import {Component} from "@angular/core";

@Component({
    selector: 'app-messages',
    template: `
        <div class="container">
            <app-thread-list></app-thread-list>
            <div class="row">
                <app-message-list></app-message-list>
            </div>
            <div class="row">
                <app-message-input></app-message-input>
            </div>
        </div>
    `,
    styles: [`
        .container {
            min-height: calc(100vh - 100px);
            padding: 20px 40px;
            background-color: #e2e2e2;
        }
    `]
})
export class MessagesComponent {

}