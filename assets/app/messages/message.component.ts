import {Component, Input} from "@angular/core";
import {Message} from "./message.model";
import {MessageService} from "./message.service";

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styles: [`
        .author {
            display: inline-block;
            font-style: italic;
            font-size: 12px;
            width: 80%;
        }
        .config {
            display: inline-block;
            visibility: hidden;
            text-align: right;
            font-size: 12px;
            width: 100%;
        }
        .panel:hover .config {
            visibility: visible;
        }
        .panel {
            width: 75%;
            border-radius: 20px 10px 20px 0;
        }
        .panel .panel-footer {
            border-radius: 0 0 20px 0;
        }
        .my-message-body {
            margin-left: 25%;
            border-radius: 10px 20px 0 20px;
        }
        .my-message-body .panel-footer {
            display:block;
            visibility: hidden;
            border-radius: 0 0 0 20px;
            border-top: none;
            padding: 0;
            height: 0;
            transition: visibility 0s, height, padding;
            -webkit-transition: visibility 0s, height, padding;
            transition-duration: 300ms;
            -webkit-transition-duration: 300ms;
            transition-timing-function: ease-in;
            -webkit-transition-timing-function: ease-in;
        }
        
        .my-message-body:hover .panel-footer {
            visibility: visible;
            height: auto;
            padding: 10px 15px;
            border-top: 1px solid #ddd;
        }
    `]
})

export class MessageComponent {
    @Input() message: Message;

    constructor(private messageService: MessageService) { }

    onEdit() {
        this.messageService.editMessage(this.message);
    }

    onDelete() {
        this.messageService.deleteMessage(this.message)
            .subscribe(
                result => console.log(result)
            );
    }

    belongsToUser() {
        return localStorage.getItem('userId') == this.message.userId;
    }
}