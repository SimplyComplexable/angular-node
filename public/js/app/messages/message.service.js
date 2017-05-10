var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Message } from "./message.model";
import { Headers, Http } from "@angular/http";
import { EventEmitter, Injectable } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { ErrorService } from "../error/error.service";
import { Subject } from "rxjs/Subject";
import { environment } from "../environment";
var MessageService = (function () {
    function MessageService(http, errorService) {
        this.http = http;
        this.errorService = errorService;
        this.messages = [];
        this.ngUnsubscribe = new Subject();
        this.refreshRate = 3000; //ms
        this.messageIsEdit = new EventEmitter();
        this.messageSubscription = new EventEmitter();
        if (environment.prod) {
            this.rootUrl = 'https://nodeangular2-deployment.herokuapp.com/';
        }
        else {
            this.rootUrl = 'http://localhost:3000/';
        }
    }
    MessageService.prototype.ngOnDestroy = function () {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    };
    MessageService.prototype.messageServerCall = function () {
        var _this = this;
        this.subscription = this.http.get(this.rootUrl + 'message')
            .map(function (response) {
            var messages = response.json().obj;
            var transformedMessages = [];
            for (var _i = 0, messages_1 = messages; _i < messages_1.length; _i++) {
                var message = messages_1[_i];
                transformedMessages.push(new Message(message.content, message.user
                    ? message.user.username
                        ? message.user.username : message.user.firstName
                    : 'Deleted', message._id, message.user ? message.user._id : 1));
            }
            _this.messageSubscription.emit(transformedMessages);
            _this.messages = transformedMessages;
            return transformedMessages;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
        return this.subscription;
    };
    MessageService.prototype.addMessage = function (message) {
        var _this = this;
        var body = JSON.stringify(message);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.post(this.rootUrl + 'message' + token, body, { headers: headers })
            .map(function (response) {
            var result = response.json();
            var message = new Message(result.obj.content, result.obj.user.firstName, result.obj._id, result.obj.user._id);
            _this.messages.push(message);
            return message;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    MessageService.prototype.getMessages = function () {
        var _this = this;
        //prevent http call if messages already downloaded
        if (this.messages.length > 0) {
            return new Observable(function (observer) { return observer.next(_this.messages); });
        }
        return this.http.get(this.rootUrl + 'message')
            .map(function (response) {
            var messages = response.json().obj;
            var transformedMessages = [];
            for (var _i = 0, messages_2 = messages; _i < messages_2.length; _i++) {
                var message = messages_2[_i];
                transformedMessages.push(new Message(message.content, message.user
                    ? message.user.username
                        ? message.user.username : message.user.firstName
                    : 'Deleted', message._id, message.user ? message.user._id : 1));
            }
            _this.messages = transformedMessages;
            return transformedMessages;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    MessageService.prototype.subscribeToMessages = function () {
        var _this = this;
        this.messageServerCall()
            .subscribe();
        setInterval(function () {
            _this.messageServerCall()
                .subscribe();
        }, this.refreshRate);
        return this.messageSubscription;
    };
    MessageService.prototype.editMessage = function (message) {
        this.messageIsEdit.emit(message);
    };
    MessageService.prototype.updateMessage = function (message) {
        var _this = this;
        var body = JSON.stringify(message);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.patch(this.rootUrl + 'message/' + message.messageId + token, body, { headers: headers })
            .map(function (response) { return response.json(); })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    MessageService.prototype.deleteMessage = function (message) {
        var _this = this;
        this.messages.splice(this.messages.indexOf(message), 1);
        var token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.delete(this.rootUrl + 'message/' + message.messageId + token)
            .map(function (response) { return response.json(); })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    return MessageService;
}());
MessageService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http, ErrorService])
], MessageService);
export { MessageService };
