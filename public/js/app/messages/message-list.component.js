var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from "@angular/core";
import { MessageService } from "./message.service";
var MessageListComponent = (function () {
    function MessageListComponent(messageService) {
        this.messageService = messageService;
        this.messages = [];
    }
    MessageListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.messageService.getMessages()
            .subscribe(function (messages) {
            _this.messages = messages;
        });
    };
    return MessageListComponent;
}());
MessageListComponent = __decorate([
    Component({
        selector: 'app-message-list',
        template: "\n        <div class=\"col-md-8 col-md-offset-2\">\n            <app-message *ngFor=\"let message of messages\"\n                         [message]=\"message\">\n            </app-message>\n        </div>\n    "
    }),
    __metadata("design:paramtypes", [MessageService])
], MessageListComponent);
export { MessageListComponent };
