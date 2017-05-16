import {AfterViewChecked, Component, ElementRef, HostListener, OnInit, ViewChild} from "@angular/core";
import {Message} from "./message.model";
import {MessageService} from "./message.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'app-message-list',
    template: `
        <div id="message-list-container" #scrollMe (scroll)="onScroll()">
            <app-message *ngFor="let message of messages"
                         [message]="message">
            </app-message>
            <div id="bottom"></div>
        </div>
    `,
    styles: [`
        #message-list-container {
            margin-bottom: 150px;
            overflow-y: auto;
            height: calc(100vh - 150px);
        }
    `]
})

export class MessageListComponent implements OnInit, AfterViewChecked {
    private currentThread: string = "public";
    private messageSubscription;
    private shouldScroll: boolean = true;

    messages: Message[] = [];
    @ViewChild('scrollMe') private myScrollContainer: ElementRef;

    constructor(private messageService: MessageService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.queryParams
            .subscribe(
                (params: Params) => {
                    if (params.thread) {
                        if (this.messageSubscription) {
                            this.messageSubscription.unsubscribe();
                        }
                        this.currentThread = params.thread;
                        // this.messageService.getMessages()
                        this.messageSubscription = this.messageService.subscribeToMessages(this.currentThread)
                            .subscribe(
                                (messages: Message[]) => this.messages = messages
                            );
                    }
                }
            );
        this.scrollToBottom();
    }

    ngAfterViewChecked() {
        if (this.shouldScroll) {
            this.scrollToBottom();
        }
    }

    scrollToBottom(): void {
        try {
            if (this.myScrollContainer.nativeElement.scrollHeight - this.myScrollContainer.nativeElement.scrollTop
                > this.myScrollContainer.nativeElement.clientHeight) {
                this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
            }
        } catch(err) { }
    }

    onScroll() {
        if (this.myScrollContainer.nativeElement.scrollHeight - this.myScrollContainer.nativeElement.scrollTop
            <= this.myScrollContainer.nativeElement.clientHeight) {
            return this.shouldScroll = true;
        }
        this.shouldScroll = false;
    }
}