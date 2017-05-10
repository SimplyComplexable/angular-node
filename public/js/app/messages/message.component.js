var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from "@angular/core";
import { Message } from "./message.model";
import { MessageService } from "./message.service";
var MessageComponent = (function () {
    function MessageComponent(messageService) {
        this.messageService = messageService;
    }
    MessageComponent.prototype.onEdit = function () {
        this.messageService.editMessage(this.message);
    };
    MessageComponent.prototype.onDelete = function () {
        this.messageService.deleteMessage(this.message)
            .subscribe(function (result) { return console.log(result); });
    };
    MessageComponent.prototype.belongsToUser = function () {
        return localStorage.getItem('userId') == this.message.userId;
    };
    return MessageComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Message)
], MessageComponent.prototype, "message", void 0);
MessageComponent = __decorate([
    Component({
        selector: 'app-message',
        templateUrl: './message.component.html',
        styles: ["\n        .author {\n            display: inline-block;\n            font-style: italic;\n            font-size: 12px;\n            width: 80%;\n        }\n        .config {\n            display: inline-block;\n            visibility: hidden;\n            text-align: right;\n            font-size: 12px;\n            width: 100%;\n        }\n        .panel:hover .config {\n            visibility: visible;\n        }\n        .panel {\n            width: 75%;\n            border-radius: 20px 10px 20px 0;\n        }\n        .panel .panel-footer {\n            border-radius: 0 0 20px 0;\n        }\n        .my-message-body {\n            margin-left: 25%;\n            border-radius: 10px 20px 0 20px;\n        }\n        .my-message-body .panel-footer {\n            display:block;\n            visibility: hidden;\n            border-radius: 0 0 0 20px;\n            border-top: none;\n            padding: 0;\n            height: 0;\n            transition: visibility 0s, height, padding;\n            -webkit-transition: visibility 0s, height, padding;\n            transition-duration: 300ms;\n            -webkit-transition-duration: 300ms;\n            transition-timing-function: ease-in;\n            -webkit-transition-timing-function: ease-in;\n        }\n        \n        .my-message-body:hover .panel-footer {\n            visibility: visible;\n            height: auto;\n            padding: 10px 15px;\n            border-top: 1px solid #ddd;\n        }\n    "]
    }),
    __metadata("design:paramtypes", [MessageService])
], MessageComponent);
export { MessageComponent };
