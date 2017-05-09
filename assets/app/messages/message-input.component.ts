import {Component, OnInit} from "@angular/core";
import {MessageService} from "./message.service";
import {Message} from "./message.model";
import {NgForm} from "@angular/forms";

@Component({
    selector: 'app-message-input',
    templateUrl: './message-input.component.html',
    styleUrls: ['./message-input.component.css']
})

export class MessageInputComponent implements OnInit {
    message: Message;

    constructor(private messageService: MessageService) {}

    ngOnInit() {
        this.messageService.messageIsEdit.subscribe(
            (message: Message) => this.message = message
        );
    }

    onSubmit(form: NgForm) {
        if (!form.value.content) {
            return false;
        }
        if (this.message) {
            //editing
            this.message.content = form.value.content;
            this.messageService.updateMessage(this.message)
                .subscribe(
                    result => console.log(result)
                );
            this.message = null;
        } else {
            //creating
            const message: Message = new Message(form.value.content, 'Zack');
            this.messageService.addMessage(message)
                .subscribe(
                    data => console.log(data),
                    error => console.error(error)
                );
        }
        form.resetForm();
        this.messageService.scrollToBottom();
    }

    onClear(form: NgForm) {
        this.message = null;
        form.resetForm();
    }
}