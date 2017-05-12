import {NgModule} from "@angular/core";
import {MessagesComponent} from "./messages.component";
import {MessageInputComponent} from "./message-input.component";
import {MessageListComponent} from "./message-list.component";
import {MessageComponent} from "./message.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MessageService} from "./message.service";
import {ThreadListComponent} from "./thread-list.component";
import {ThreadComponent} from "./thread.component";
import {RouterModule} from "@angular/router";

@NgModule({
    declarations: [
        MessageComponent,
        MessageListComponent,
        MessageInputComponent,
        MessagesComponent,
        ThreadListComponent,
        ThreadComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule
    ],
    providers: [MessageService]
})

export class  MessageModule {

}