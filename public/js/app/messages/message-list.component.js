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
var MessageListComponent = (function () {
    function MessageListComponent(messageService) {
        this.messageService = messageService;
        this.messages = [];
    }
    MessageListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.scrollToBottom();
        this.messageService.getMessages()
            .subscribe(function (messages) {
            _this.messages = messages;
        });
    };
    MessageListComponent.prototype.ngAfterViewChecked = function () {
        this.scrollToBottom();
    };
    MessageListComponent.prototype.scrollToBottom = function () {
        try {
            document.body.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        }
        catch (err) {
            console.log('WTF');
        }
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
        template: "\n        <div class=\"col-md-8 col-md-offset-2\" id=\"message-list-container\" #scrollMe>\n            <app-message *ngFor=\"let message of messages\"\n                         [message]=\"message\">\n            </app-message>\n            <div id=\"bottom\"></div>\n        </div>\n    ",
        styles: ["\n        #message-list-container {\n            padding-bottom: 100px;\n        }\n    "]
    }),
    __metadata("design:paramtypes", [MessageService])
], MessageListComponent);
export { MessageListComponent };
