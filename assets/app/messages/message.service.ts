import {Message} from "./message.model";
import {Headers, Http, Response} from "@angular/http";
import {EventEmitter, Injectable, OnDestroy} from "@angular/core";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";
import {ErrorService} from "../error/error.service";
import {Subject} from "rxjs/Subject";

@Injectable()

export class MessageService implements OnDestroy {
    private messages: Message[] = [];
    private ngUnsubscribe: Subject<void> = new Subject<void>();
    messageIsEdit = new EventEmitter<Message>();
    messageSubscription = new EventEmitter<Message[]>();
    subscription;

    rootUrl: string = 'https://nodeangular2-deployment.herokuapp.com/';
    // rootUrl: string = 'http://localhost:3000/';

    constructor(private http: Http, private errorService: ErrorService) {}

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    private messageServerCall() {

        this.subscription = this.http.get(this.rootUrl + 'message')
            .map((response: Response) => {
                const messages = response.json().obj;
                let transformedMessages: Message[] = [];
                for (let message of messages) {
                    transformedMessages.push(
                        new Message(
                            message.content,
                            message.user
                                ? message.user.username
                                ?  message.user.username : message.user.firstName
                                : 'Deleted',
                            message._id,
                            message.user ? message.user._id : 1
                        )
                    );
                }
                this.messageSubscription.emit(transformedMessages);
                this.messages = transformedMessages;
                return transformedMessages;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });

        this.subscription.subscribe();
    }

    scrollToBottom() {
        console.log(document.body.scrollHeight);

    }

    addMessage(message: Message) {
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ?  '?token=' + localStorage.getItem('token')
            : '';
        return this.http.post(this.rootUrl + 'message' + token, body, { headers })
            .map((response: Response) => {
                const result = response.json();
                const message =  new Message(result.obj.content, result.obj.user.firstName, result.obj._id, result.obj.user._id);
                this.messages.push(message);
                return message;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    getMessages() {
        //prevent http call if messages already downloaded
        if (this.messages.length > 0) {
            return new Observable(observer => observer.next(this.messages))
        }
        return this.http.get(this.rootUrl + 'message')
            .map((response: Response) => {
                const messages = response.json().obj;
                let transformedMessages: Message[] = [];
                for (let message of messages) {
                    transformedMessages.push(
                        new Message(
                            message.content,
                            message.user
                                ? message.user.username
                                ?  message.user.username : message.user.firstName
                                : 'Deleted',
                            message._id,
                            message.user ? message.user._id : 1
                        )
                    );
                }
                this.messages = transformedMessages;
                return transformedMessages;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    subscribeToMessages() {
        this.messageServerCall();
        setInterval(() => {
            this.messageServerCall()
        }, 5000);
        return this.messageSubscription;
    }

    editMessage(message: Message) {
        this.messageIsEdit.emit(message);
    }

    updateMessage(message: Message) {
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ?  '?token=' + localStorage.getItem('token')
            : '';
        return this.http.patch(this.rootUrl + 'message/' + message.messageId + token, body, {headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    deleteMessage(message: Message) {
        this.messages.splice(this.messages.indexOf(message),1);
        const token = localStorage.getItem('token')
            ?  '?token=' + localStorage.getItem('token')
            : '';
        return this.http.delete(this.rootUrl + 'message/' + message.messageId + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
}