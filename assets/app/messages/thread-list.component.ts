import {Component, OnInit} from "@angular/core";
import {MessageService} from "./message.service";

@Component({
    selector: 'app-thread-list',
    templateUrl: './thread-list.component.html',
    styleUrls: ['./thread-list.component.css']
})

export class ThreadListComponent implements OnInit {
    threads: string[] = [];

    constructor(private messageService: MessageService) {}

    ngOnInit() {
        this.messageService.getThreads()
            .subscribe(
                threads => this.threads = threads.obj
            );
    }
}