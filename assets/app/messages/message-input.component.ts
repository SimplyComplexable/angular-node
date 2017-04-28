import {Component} from "@angular/core";
import {MessageService} from "./message.service";
import {Message} from "./message.model";
import {NgForm} from "@angular/forms";

@Component({
    selector: 'app-message-input',
    templateUrl: './message-input.component.html'
})

export class MessageInputComponent {

    constructor(private messageService: MessageService) {}

    onSubmit(form: NgForm) {
        if (!form.value.content) {
            return false;
        }
        const message: Message = new Message(form.value.content, 'Zack');
        this.messageService.addMessage(message);
        form.resetForm();
    }
}