var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, ViewChild } from "@angular/core";
import { MessageService } from "./message.service";
import { ActivatedRoute } from "@angular/router";
var MessageListComponent = (function () {
    function MessageListComponent(messageService, activatedRoute) {
        this.messageService = messageService;
        this.activatedRoute = activatedRoute;
        this.currentThread = "public";
        this.shouldScroll = true;
        this.messages = [];
    }
    MessageListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.queryParams
            .subscribe(function (params) {
            if (params.thread) {
                if (_this.messageSubscription) {
                    _this.messageSubscription.unsubscribe();
                }
                _this.currentThread = params.thread;
                // this.messageService.getMessages()
                _this.messageSubscription = _this.messageService.subscribeToMessages(_this.currentThread)
                    .subscribe(function (messages) { return _this.messages = messages; });
            }
        });
        this.scrollToBottom();
    };
    MessageListComponent.prototype.ngAfterViewChecked = function () {
        if (this.shouldScroll) {
            this.scrollToBottom();
        }
    };
    MessageListComponent.prototype.scrollToBottom = function () {
        try {
            if (this.myScrollContainer.nativeElement.scrollHeight - this.myScrollContainer.nativeElement.scrollTop
                > this.myScrollContainer.nativeElement.clientHeight) {
                this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
            }
        }
        catch (err) { }
    };
    MessageListComponent.prototype.onScroll = function () {
        if (this.myScrollContainer.nativeElement.scrollHeight - this.myScrollContainer.nativeElement.scrollTop
            <= this.myScrollContainer.nativeElement.clientHeight) {
            return this.shouldScroll = true;
        }
        this.shouldScroll = false;
    };
    return MessageListComponent;
}());
__decorate([
    ViewChild('scrollMe'),
    __metadata("design:type", ElementRef)
], MessageListComponent.prototype, "myScrollContainer", void 0);
MessageListComponent = __decorate([
    Component({
        selector: 'app-message-list',
        template: "\n        <div id=\"message-list-container\" #scrollMe (scroll)=\"onScroll()\">\n            <app-message *ngFor=\"let message of messages\"\n                         [message]=\"message\">\n            </app-message>\n            <div id=\"bottom\"></div>\n        </div>\n    ",
        styles: ["\n        #message-list-container {\n            margin-bottom: 150px;\n            overflow-y: auto;\n            height: calc(100vh - 150px);\n        }\n    "]
    }),
    __metadata("design:paramtypes", [MessageService, ActivatedRoute])
], MessageListComponent);
export { MessageListComponent };
