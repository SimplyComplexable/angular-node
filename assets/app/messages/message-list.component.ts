import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {Message} from "./message.model";
import {MessageService} from "./message.service";

@Component({
    selector: 'app-message-list',
    template: `
        <div class="col-md-8 col-md-offset-2" id="message-list-container" #scrollMe>
            <app-message *ngFor="let message of messages"
                         [message]="message">
            </app-message>
            <div id="bottom"></div>
        </div>
    `,
    styles: [`
        #message-list-container {
            padding-bottom: 100px;
        }
    `]
})

export class MessageListComponent implements OnInit, AfterViewChecked {
    messages: Message[] = [];
    @ViewChild('scrollMe') private myScrollContainer: ElementRef;

    constructor(private messageService: MessageService) {}

    ngOnInit() {
        this.scrollToBottom();
        this.messageService.subscribeToMessages()
            .subscribe(
                (messages: Message[]) => {
                    this.messages = messages;
                }
            );
    }

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    scrollToBottom(): void {
        try {
            document.body.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;

        } catch(err) {
            console.log('WTF');
        }
    }
}