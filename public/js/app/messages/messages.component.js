var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from "@angular/core";
var MessagesComponent = (function () {
    function MessagesComponent() {
    }
    return MessagesComponent;
}());
MessagesComponent = __decorate([
    Component({
        selector: 'app-messages',
        template: "\n        <div class=\"container\">\n            <div class=\"row\">\n                <app-message-input></app-message-input>\n            </div>\n            <hr>\n            <div class=\"row\">\n                <app-message-list></app-message-list>\n            </div>\n        </div>\n    "
    })
], MessagesComponent);
export { MessagesComponent };
