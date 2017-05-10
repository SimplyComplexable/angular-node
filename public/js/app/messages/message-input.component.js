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
import { Message } from "./message.model";
var MessageInputComponent = (function () {
    function MessageInputComponent(messageService) {
        this.messageService = messageService;
    }
    MessageInputComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.messageService.messageIsEdit.subscribe(function (message) { return _this.message = message; });
    };
    MessageInputComponent.prototype.onSubmit = function (form) {
        if (!form.value.content) {
            return false;
        }
        if (this.message) {
            //editing
            this.message.content = form.value.content;
            this.messageService.updateMessage(this.message)
                .subscribe();
            this.message = null;
        }
        else {
            //creating
            var message = new Message(form.value.content, 'Zack');
            this.messageService.addMessage(message)
                .subscribe(function () { }, function (error) { return console.error(error); });
        }
        form.resetForm();
    };
    MessageInputComponent.prototype.onClear = function (form) {
        this.message = null;
        form.resetForm();
    };
    return MessageInputComponent;
}());
MessageInputComponent = __decorate([
    Component({
        selector: 'app-message-input',
        templateUrl: './message-input.component.html',
        styleUrls: ['./message-input.component.css']
    }),
    __metadata("design:paramtypes", [MessageService])
], MessageInputComponent);
export { MessageInputComponent };
